import Order from "../models/Order.js";
import User from "../models/User.js";
import {
  getCashfreeInstance,
  getCashfreeMode,
  getCashfreeClientMode,
  isConfigured,
  verifyCashfreeWebhookSignature,
  ROADMAP_PRICE_INR,
  CASHFREE_API_VERSION,
} from "../config/cashfree.js";

// @desc    Create Cashfree Payment Order
// @route   POST /api/payment/create-order
// @access  Private (Requires JWT token)
export const createOrder = async (req, res) => {
  const currentMode = getCashfreeMode();

  try {
    const { careerId } = req.body;

    if (!careerId) {
      return res.status(400).json({
        success: false,
        message: "careerId is required to unlock a roadmap",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user has already unlocked this roadmap
    if (Array.isArray(user.purchasedRoadmaps) && user.purchasedRoadmaps.includes(careerId)) {
      return res.status(400).json({
        success: false,
        alreadyOwned: true,
        message: "You have already unlocked this roadmap! Head to your dashboard to explore it.",
      });
    }

    // Single source of truth for roadmap unlock price (in INR)
    const orderAmount = ROADMAP_PRICE_INR;
    const currency = "INR";
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const receipt = `rcpt_${Date.now()}_${user._id.toString().slice(-4)}`;

    // Extract actual active client origin from request
    let refererOrigin = "";
    try {
      if (req.headers.referer) {
        refererOrigin = new URL(req.headers.referer).origin;
      }
    } catch {}

    const clientOrigin = (
      req.body?.frontendOrigin ||
      req.headers.origin ||
      refererOrigin ||
      ""
    ).trim().replace(/\/+$/, "");

    // Dynamic, environment-aware frontend base URL:
    // 1. If FRONTEND_URL is explicitly set in .env, use it
    // 2. If browsing on localhost, use the active browser port (e.g. http://localhost:5000)
    // 3. Fall back to CLIENT_URL or current server port
    let frontendBaseUrl = (process.env.FRONTEND_URL || "").trim().replace(/\/+$/, "");

    if (!frontendBaseUrl) {
      if (clientOrigin && (clientOrigin.includes("localhost") || clientOrigin.includes("127.0.0.1"))) {
        frontendBaseUrl = clientOrigin;
      } else if (process.env.CLIENT_URL) {
        frontendBaseUrl = process.env.CLIENT_URL.trim().replace(/\/+$/, "");
      } else {
        frontendBaseUrl = `http://localhost:${process.env.PORT || 5000}`;
      }
    }

    // If configured frontendBaseUrl is on localhost (e.g. :3000) but the browser request arrived from another localhost port (e.g. :5000), align with the active browser port!
    if (
      clientOrigin &&
      (clientOrigin.includes("localhost") || clientOrigin.includes("127.0.0.1")) &&
      (frontendBaseUrl.includes("localhost") || frontendBaseUrl.includes("127.0.0.1")) &&
      frontendBaseUrl !== clientOrigin
    ) {
      console.log(`🔄 [Cashfree PG]: Auto-adjusting return_url origin from ${frontendBaseUrl} to active browser origin ${clientOrigin}`);
      frontendBaseUrl = clientOrigin;
    }

    const returnUrl = `${frontendBaseUrl}/pricing?order_id={order_id}&career=${encodeURIComponent(careerId)}`;

    const orderMeta = {
      return_url: returnUrl,
    };

    // notify_url is Cashfree's per-order server-to-server webhook destination.
    // Cashfree servers cannot reach localhost/127.0.0.1 directly.
    // Only attach notify_url if BACKEND_URL is set to a publicly accessible host (e.g. ngrok or deployed domain).
    const backendBaseUrl = (process.env.BACKEND_URL || "").trim().replace(/\/+$/, "");
    if (backendBaseUrl && !backendBaseUrl.includes("localhost") && !backendBaseUrl.includes("127.0.0.1")) {
      orderMeta.notify_url = `${backendBaseUrl}/api/payment/webhook`;
    }

    if (!isConfigured()) {
      console.warn(
        `⚠️ [Cashfree PG - ${currentMode}]: CASHFREE_APP_ID or CASHFREE_SECRET_KEY is missing or contains placeholder values in backend/.env.`
      );
      return res.status(400).json({
        success: false,
        code: "CASHFREE_NOT_CONFIGURED",
        message:
          "Cashfree API keys are not configured. Please add your active CASHFREE_APP_ID and CASHFREE_SECRET_KEY to backend/.env (from https://sandbox.cashfree.com/).",
      });
    }

    const cashfree = getCashfreeInstance();
    if (!cashfree) {
      return res.status(500).json({
        success: false,
        code: "CASHFREE_INIT_ERROR",
        message: "Failed to initialize Cashfree SDK client. Please verify your backend/.env configuration.",
      });
    }

    let paymentSessionId = null;
    let cfOrderId = null;

    // Build Cashfree PG Order request matching API version specification
    const cfRequest = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: currency,
      customer_details: {
        customer_id: user._id.toString(),
        customer_email: user.email,
        customer_name: user.name || "Growvia Student",
        customer_phone: user.phone || "9999999999",
      },
      order_meta: orderMeta,
      order_note: `Growvia Roadmap Unlock: ${careerId} for ${user.email}`,
    };

    try {
      const response = await cashfree.PGCreateOrder(cfRequest);
      const data = response.data;
      paymentSessionId = data.payment_session_id;
      cfOrderId = String(data.cf_order_id || "");

      console.log(
        `💳 [Cashfree PG - ${currentMode}]: Created order ${orderId} (CF Order: ${cfOrderId}, Amount: ₹${orderAmount}) for career ${careerId}`
      );
    } catch (sdkErr) {
      const errDetails = sdkErr.response?.data || {};
      const isAuthError =
        (errDetails.message && /auth/i.test(errDetails.message)) ||
        sdkErr.response?.status === 401;

      console.error(
        `❌ [Cashfree PG - ${currentMode}]: Create order API failed:`,
        errDetails.message || sdkErr.message,
        `(Code: ${errDetails.code || "UNKNOWN"})`
      );

      let userFacingMessage = errDetails.message || "Could not initialize Cashfree payment session. Please try again.";
      if (isAuthError) {
        console.error(
          `👉 [Cashfree Setup Guide]: Ensure you are using credentials for ${currentMode} mode.\n` +
          `   - Sandbox dashboard: https://sandbox.cashfree.com/ (Payment Gateway -> Developers -> API Keys)\n` +
          `   - Copy App ID into CASHFREE_APP_ID\n` +
          `   - Copy Secret Key into CASHFREE_SECRET_KEY\n` +
          `   - Ensure CASHFREE_ENV=${currentMode}`
        );
        userFacingMessage = `Cashfree authentication failed: The API rejected your ${currentMode} App ID or Secret Key. Please check backend/.env.`;
      }

      return res.status(sdkErr.response?.status || 500).json({
        success: false,
        message: userFacingMessage,
        code: errDetails.code || "CASHFREE_ORDER_ERROR",
      });
    }

    // Save initial order in database
    await Order.create({
      orderId,
      userId: user._id,
      careerId,
      amount: orderAmount,
      currency,
      receipt,
      cfOrderId,
      paymentSessionId,
      status: "created",
      notes: {
        userId: user._id.toString(),
        careerId,
        userEmail: user.email,
        environmentMode: currentMode,
        apiVersion: CASHFREE_API_VERSION,
      },
    });

    return res.status(200).json({
      success: true,
      orderId,
      paymentSessionId,
      amount: orderAmount,
      currency,
      careerId,
      environment: getCashfreeClientMode(), // "sandbox" or "production"
      mode: currentMode, // "TEST" or "PRODUCTION"
      isConfigured: isConfigured(),
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(`❌ [Cashfree PG - ${currentMode}]: Create order error:`, error.message);
    return res.status(500).json({
      success: false,
      message: "Could not create payment order. Please try again.",
      error: error.message,
    });
  }
};

// @desc    Verify Cashfree Payment Status and Fulfill Roadmap Access
// @route   POST /api/payment/verify
// @access  Private (Requires JWT token)
export const verifyPayment = async (req, res) => {
  const currentMode = getCashfreeMode();

  try {
    const { orderId, careerId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Missing orderId for payment verification",
      });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order ${orderId} not found in database`,
      });
    }

    const targetCareerId = careerId || order.careerId;

    // If order is already verified as paid, return idempotent success
    if (order.status === "paid") {
      const existingUser = await User.findById(req.user._id);
      return res.status(200).json({
        success: true,
        alreadyPaid: true,
        message: "Payment was already confirmed! Enjoy your roadmap.",
        careerId: targetCareerId,
        purchasedRoadmaps: existingUser?.purchasedRoadmaps || [],
        savedRoadmaps: existingUser?.savedRoadmaps || [],
      });
    }

    let isPaymentSuccessful = false;
    let cfPaymentId = order.cfPaymentId || null;
    let cfOrderId = order.cfOrderId || null;

    const cashfree = getCashfreeInstance();

    if (cashfree && isConfigured()) {
      try {
        // 1. Fetch payment attempts for this order
        const paymentsResponse = await cashfree.PGOrderFetchPayments(orderId);
        const payments = Array.isArray(paymentsResponse.data) ? paymentsResponse.data : [];

        const successfulPayment = payments.find(
          (p) => String(p.payment_status).toUpperCase() === "SUCCESS"
        );

        if (successfulPayment) {
          isPaymentSuccessful = true;
          cfPaymentId = String(successfulPayment.cf_payment_id || "");
        } else {
          // 2. Secondary check on order status directly
          const orderResponse = await cashfree.PGFetchOrder(orderId);
          const orderData = orderResponse.data || {};
          if (String(orderData.order_status).toUpperCase() === "PAID") {
            isPaymentSuccessful = true;
            if (orderData.cf_order_id) cfOrderId = String(orderData.cf_order_id);
          }
        }
      } catch (fetchErr) {
        console.error(
          `❌ [Cashfree PG - ${currentMode}]: Failed to verify payment for order ${orderId}:`,
          fetchErr.response?.data?.message || fetchErr.message
        );
        return res.status(fetchErr.response?.status || 500).json({
          success: false,
          message: "Could not fetch payment verification from Cashfree",
          error: fetchErr.response?.data?.message || fetchErr.message,
        });
      }
    } else {
      // In development mode with unconfigured keys, report requirement
      return res.status(400).json({
        success: false,
        message: "Cashfree API keys are not configured in backend/.env. Cannot verify payment.",
      });
    }

    if (!isPaymentSuccessful) {
      console.warn(`⚠️ [Cashfree PG - ${currentMode}]: Order ${orderId} is not in SUCCESS/PAID status.`);
      order.status = "failed";
      await order.save();

      return res.status(400).json({
        success: false,
        message: "Payment has not been completed successfully or is still pending.",
      });
    }

    // Mark order as paid in Database
    order.status = "paid";
    if (cfPaymentId) order.cfPaymentId = cfPaymentId;
    if (cfOrderId) order.cfOrderId = cfOrderId;
    await order.save();

    // Fulfill access: Add roadmap to user's purchasedRoadmaps & remove from savedRoadmaps
    const user = await User.findById(req.user._id);
    if (user && targetCareerId) {
      if (!Array.isArray(user.purchasedRoadmaps)) {
        user.purchasedRoadmaps = [];
      }
      if (!user.purchasedRoadmaps.includes(targetCareerId)) {
        user.purchasedRoadmaps.push(targetCareerId);
      }
      if (Array.isArray(user.savedRoadmaps) && user.savedRoadmaps.includes(targetCareerId)) {
        user.savedRoadmaps = user.savedRoadmaps.filter((id) => id !== targetCareerId);
      }
      await user.save();
    }

    console.log(
      `✅ [Cashfree PG - ${currentMode}]: Order ${orderId} verified successfully. Career "${targetCareerId}" unlocked for ${user?.email}`
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified and roadmap successfully unlocked! 🎉",
      careerId: targetCareerId,
      purchasedRoadmaps: user?.purchasedRoadmaps || [],
      savedRoadmaps: user?.savedRoadmaps || [],
    });
  } catch (error) {
    console.error(`❌ [Cashfree PG - ${currentMode}]: Verify payment error:`, error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during payment verification",
      error: error.message,
    });
  }
};

// @desc    Cashfree Webhook Handler
// @route   POST /api/payment/webhook
// @access  Public (Signature-verified via x-webhook-signature & x-webhook-timestamp)
export const handleCashfreeWebhook = async (req, res) => {
  const currentMode = getCashfreeMode();

  try {
    const signature = req.headers["x-webhook-signature"];
    const timestamp = req.headers["x-webhook-timestamp"];

    if (!signature || !timestamp) {
      return res.status(400).json({
        success: false,
        message: "Missing x-webhook-signature or x-webhook-timestamp header",
      });
    }

    // req.rawBody must be retained by express.json verify hook
    const rawBody = req.rawBody || (typeof req.body === "string" ? req.body : JSON.stringify(req.body));
    const isValid = verifyCashfreeWebhookSignature(signature, rawBody, timestamp);

    if (!isValid) {
      console.warn(`❌ [Cashfree Webhook - ${currentMode}]: Invalid webhook signature attempt.`);
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    const payload =
      typeof req.body === "object" && !Buffer.isBuffer(req.body)
        ? req.body
        : JSON.parse(rawBody.toString("utf8"));

    const eventType = payload.type || payload.event;
    console.log(`🔔 [Cashfree Webhook - ${currentMode}]: Verified webhook event received: ${eventType}`);

    const data = payload.data || {};
    const orderData = data.order || {};
    const paymentData = data.payment || {};

    const orderId = orderData.order_id || payload.order_id;
    const cfPaymentId = paymentData.cf_payment_id || payload.cf_payment_id;
    const cfOrderId = orderData.cf_order_id || payload.cf_order_id;

    if (eventType === "PAYMENT_SUCCESS_WEBHOOK" || eventType === "ORDER_PAID") {
      if (orderId) {
        const order = await Order.findOne({ orderId });
        if (order) {
          order.status = "paid";
          if (cfPaymentId) order.cfPaymentId = String(cfPaymentId);
          if (cfOrderId) order.cfOrderId = String(cfOrderId);
          await order.save();

          // Fulfill user roadmap access
          const user = await User.findById(order.userId);
          if (user && order.careerId) {
            if (!Array.isArray(user.purchasedRoadmaps)) {
              user.purchasedRoadmaps = [];
            }
            if (!user.purchasedRoadmaps.includes(order.careerId)) {
              user.purchasedRoadmaps.push(order.careerId);
            }
            if (Array.isArray(user.savedRoadmaps) && user.savedRoadmaps.includes(order.careerId)) {
              user.savedRoadmaps = user.savedRoadmaps.filter((id) => id !== order.careerId);
            }
            await user.save();
            console.log(
              `✅ [Cashfree Webhook - ${currentMode}]: Roadmap "${order.careerId}" unlocked for user ${user.email}`
            );
          }
        }
      }
    } else if (
      eventType === "PAYMENT_FAILED_WEBHOOK" ||
      eventType === "PAYMENT_USER_DROPPED_WEBHOOK"
    ) {
      if (orderId) {
        await Order.findOneAndUpdate({ orderId }, { status: "failed" });
        console.log(`ℹ️ [Cashfree Webhook - ${currentMode}]: Order ${orderId} marked failed/dropped.`);
      }
    }

    // Always acknowledge Cashfree with 200 OK
    return res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error(`❌ [Cashfree Webhook Error - ${currentMode}]:`, error.message);
    return res.status(500).json({
      success: false,
      message: "Webhook processing error",
      error: error.message,
    });
  }
};
