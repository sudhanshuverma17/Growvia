import crypto from "crypto";
import Order from "../models/Order.js";
import User from "../models/User.js";
import {
  getRazorpayInstance,
  isConfigured,
  verifyRazorpaySignature,
  verifyRazorpayWebhookSignature,
} from "../config/razorpay.js";

// @desc    Direct Roadmap Unlock / Purchase Bypass
// @route   POST /api/payment/bypass-unlock
// @access  Private (Requires JWT token)
export const bypassUnlockRoadmap = async (req, res) => {
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

    if (!Array.isArray(user.purchasedRoadmaps)) {
      user.purchasedRoadmaps = [];
    }

    // Add to purchasedRoadmaps if not already there
    if (!user.purchasedRoadmaps.includes(careerId)) {
      user.purchasedRoadmaps.push(careerId);
    }

    // Remove from savedRoadmaps since it is now purchased/unlocked
    if (Array.isArray(user.savedRoadmaps) && user.savedRoadmaps.includes(careerId)) {
      user.savedRoadmaps = user.savedRoadmaps.filter((id) => id !== careerId);
    }

    await user.save();

    // Optionally record a completed free/bypassed Order in DB for consistency
    try {
      const bypassOrderId = `bypass_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      await Order.create({
        orderId: bypassOrderId,
        userId: user._id,
        careerId,
        amount: 0,
        currency: "INR",
        status: "paid",
        receipt: `bypass_${user._id.toString().slice(-4)}`,
        notes: { mode: "direct_bypass" },
      });
    } catch (orderErr) {
      // Non-blocking
    }

    return res.status(200).json({
      success: true,
      message: "Roadmap unlocked and added to your profile! 🎉",
      careerId,
      purchasedRoadmaps: user.purchasedRoadmaps,
      savedRoadmaps: user.savedRoadmaps,
    });
  } catch (error) {
    console.error("[Bypass Unlock Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Could not unlock roadmap. Please try again.",
      error: error.message,
    });
  }
};

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private (Requires JWT token)
export const createOrder = async (req, res) => {
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

    // Fixed price for Growvia Starter single roadmap unlock: ₹99 = 9900 paise
    const amountInPaise = 9900;
    const currency = "INR";
    const receipt = `rcpt_${Date.now()}_${user._id.toString().slice(-4)}`;

    let razorpayOrderId;
    const razorpay = getRazorpayInstance();

    if (razorpay) {
      // Live / Test mode via Razorpay API
      const rzpOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency,
        receipt,
        notes: {
          userId: user._id.toString(),
          careerId,
          userEmail: user.email,
        },
      });
      razorpayOrderId = rzpOrder.id;
    } else {
      // Dev simulation fallback when Razorpay credentials are not yet configured in .env
      razorpayOrderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      console.log(`[Payment]: Created simulated dev order ${razorpayOrderId} for ${careerId}`);
    }

    // Save order in database
    await Order.create({
      orderId: razorpayOrderId,
      userId: user._id,
      careerId,
      amount: amountInPaise,
      currency,
      receipt,
      status: "created",
      notes: {
        userId: user._id.toString(),
        careerId,
        userEmail: user.email,
      },
    });

    const publicRazorpayKeyId = process.env.RAZORPAY_KEY_ID?.trim() || "rzp_test_GrowviaDevTestKey";

    return res.status(200).json({
      success: true,
      orderId: razorpayOrderId,
      amount: amountInPaise,
      currency,
      keyId: publicRazorpayKeyId,
      careerId,
      isMockMode: !isConfigured(),
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[Create Order Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Could not create payment order. Please try again.",
      error: error.message,
    });
  }
};

// @desc    Verify Razorpay Payment Signature and Fulfill Order
// @route   POST /api/payment/verify
// @access  Private (Requires JWT token)
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      careerId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification parameters: order_id, payment_id, or signature",
      });
    }

    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      console.warn(`[Payment Warning]: Signature verification failed for order ${razorpay_order_id}`);
      await Order.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "failed" }
      );
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed. Transaction was not credited.",
      });
    }

    // Mark order as paid in Database
    const order = await Order.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      { new: true }
    );

    const targetCareerId = careerId || (order ? order.careerId : null);

    // Fulfill access: Add roadmap to user's purchasedRoadmaps & remove from savedRoadmaps
    const user = await User.findById(req.user._id);
    if (user && targetCareerId) {
      if (!Array.isArray(user.purchasedRoadmaps)) {
        user.purchasedRoadmaps = [];
      }
      if (!user.purchasedRoadmaps.includes(targetCareerId)) {
        user.purchasedRoadmaps.push(targetCareerId);
      }
      // Remove from savedRoadmaps since it is now purchased
      if (Array.isArray(user.savedRoadmaps) && user.savedRoadmaps.includes(targetCareerId)) {
        user.savedRoadmaps = user.savedRoadmaps.filter((id) => id !== targetCareerId);
      }
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified and roadmap successfully unlocked! 🎉",
      careerId: targetCareerId,
      purchasedRoadmaps: user?.purchasedRoadmaps || [],
      savedRoadmaps: user?.savedRoadmaps || [],
    });
  } catch (error) {
    console.error("[Verify Payment Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during payment verification",
      error: error.message,
    });
  }
};

// @desc    Razorpay Webhook Handler
// @route   POST /api/payment/webhook
// @access  Public (Signature-verified via X-Razorpay-Signature)
export const handleRazorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.warn("⚠️ [Razorpay Webhook]: RAZORPAY_WEBHOOK_SECRET is not set in backend/.env.");
      return res.status(500).json({
        success: false,
        message: "Webhook secret is not configured on the server",
      });
    }

    if (!signature) {
      return res.status(400).json({
        success: false,
        message: "Missing X-Razorpay-Signature header",
      });
    }

    // req.rawBody must be available from the body parser
    const rawBody = req.rawBody || (typeof req.body === "string" ? req.body : JSON.stringify(req.body));
    const isValid = verifyRazorpayWebhookSignature(rawBody, signature, webhookSecret);

    if (!isValid) {
      console.warn("❌ [Razorpay Webhook]: Invalid webhook signature attempt.");
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    const payload = typeof req.body === "object" && !Buffer.isBuffer(req.body) ? req.body : JSON.parse(rawBody.toString("utf8"));
    const event = payload.event;
    console.log(`🔔 [Razorpay Webhook]: Verified event received: ${event}`);

    // Handle payment.captured or order.paid
    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id || payload.payload?.order?.entity?.id;
      const paymentId = paymentEntity?.id;

      if (orderId) {
        // Find existing order in DB
        const order = await Order.findOne({ orderId });
        if (order) {
          order.status = "paid";
          if (paymentId) order.razorpayPaymentId = paymentId;
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
            console.log(`✅ [Razorpay Webhook]: Roadmap "${order.careerId}" unlocked for user ${user.email}`);
          }
        }
      }
    } else if (event === "payment.failed") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      if (orderId) {
        await Order.findOneAndUpdate({ orderId }, { status: "failed" });
        console.log(`ℹ️ [Razorpay Webhook]: Order ${orderId} marked failed.`);
      }
    }

    // Always acknowledge Razorpay promptly with 200 OK
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("[Razorpay Webhook Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Webhook processing error",
      error: error.message,
    });
  }
};
