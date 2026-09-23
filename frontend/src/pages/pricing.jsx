import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { careers, pricingFeatures } from "@/lib/mock-data";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api-config";
import { CareerIcon } from "@/components/career-icon";

// Centralized roadmap price constant (₹199)
export const ROADMAP_PRICE_INR = 199;

// Helper to dynamically load the Cashfree v3 JS SDK
const loadCashfreeScript = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Cashfree) return resolve(true);

    const existingScript = document.querySelector('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Pricing() {
  const { courses } = useCourses();
  const { user, token, isAuthenticated, refreshUser, addPurchasedRoadmap } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [loadingPayment, setLoadingPayment] = useState(false);

  const allCareers = courses && courses.length > 0 ? courses : careers;

  const [selectedCareer, setSelectedCareer] = useState(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const urlCareer = searchParams.get("career");
      if (urlCareer) return urlCareer;
    }
    return allCareers[0]?.id || "";
  });

  // Pre-load Cashfree checkout SDK on page mount
  useEffect(() => {
    loadCashfreeScript();
  }, []);

  // Synchronize default selection when courses load
  useEffect(() => {
    if (!selectedCareer && allCareers.length > 0) {
      setSelectedCareer(allCareers[0].id);
    }
  }, [allCareers, selectedCareer]);

  const currentCareer = allCareers.find((c) => c.id === selectedCareer) || allCareers[0];
  const isAlreadyPurchased = Boolean(
    user &&
    Array.isArray(user.purchasedRoadmaps) &&
    selectedCareer &&
    user.purchasedRoadmaps.includes(selectedCareer)
  );

  // Helper to verify payment with backend and fulfill user access
  const verifyAndFulfill = async (orderId, careerId) => {
    setLoadingPayment(true);
    const activeToken = token || (typeof window !== "undefined" ? localStorage.getItem("growvia_token") : null);
    if (!activeToken) {
      toast({
        title: "Session Expired",
        description: "Please log in to finalize your purchase confirmation.",
        variant: "destructive",
      });
      setLoadingPayment(false);
      return;
    }

    try {
      const verifyRes = await fetch(apiUrl("/api/payment/verify"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({
          orderId,
          careerId,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(verifyData.message || "Payment verification could not be completed.");
      }

      const targetCareerId = careerId || verifyData.careerId || selectedCareer;
      addPurchasedRoadmap(targetCareerId);
      await refreshUser();

      toast({
        title: "Roadmap Unlocked! 🎉",
        description: `You now have lifetime access to the ${currentCareer?.title || "career"} roadmap.`,
      });

      setLocation(`/dashboard?unlocked=${targetCareerId}`);
    } catch (err) {
      console.error("[Cashfree Verification Error]:", err);
      toast({
        title: "Payment Verification Failed",
        description: err.message || "Unable to confirm payment with Cashfree. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingPayment(false);
    }
  };

  // 1. Cross-window listeners (postMessage & localStorage) when popup completes payment and self-closes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleSuccessEvent = (orderId, careerId) => {
      if (!orderId) return;
      verifyAndFulfill(orderId, careerId);
    };

    // A. postMessage listener from popup window
    const handlePostMessage = (event) => {
      if (event.data && event.data.type === "GROWVIA_PAYMENT_SUCCESS") {
        handleSuccessEvent(event.data.orderId, event.data.careerId);
      }
    };

    // B. localStorage cross-window sync listener
    const handleStorageEvent = (event) => {
      if (event.key === "growvia_cf_payment_event" && event.newValue) {
        try {
          const payload = JSON.parse(event.newValue);
          if (payload && payload.type === "GROWVIA_PAYMENT_SUCCESS") {
            handleSuccessEvent(payload.orderId, payload.careerId);
          }
        } catch (e) {}
      }
    };

    window.addEventListener("message", handlePostMessage);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("message", handlePostMessage);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [token]);

  // 2. Check for return redirect parameters (e.g. from return_url after 3DS authentication)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const activeToken = token || localStorage.getItem("growvia_token");
    if (!activeToken) return;

    const searchParams = new URLSearchParams(window.location.search);
    const orderIdFromUrl = searchParams.get("order_id");
    const careerFromUrl = searchParams.get("career");

    if (orderIdFromUrl) {
      window.history.replaceState({}, document.title, window.location.pathname);
      verifyAndFulfill(orderIdFromUrl, careerFromUrl);
    }
  }, [token]);

  const handleUnlockClick = async () => {
    if (!selectedCareer) return;

    // 1. If not logged in, redirect to login with return path
    if (!isAuthenticated || !token) {
      toast({
        title: "Sign in required",
        description: "Please log in or create an account to unlock your career roadmap.",
      });
      setLocation(`/login?redirect=${encodeURIComponent(`/pricing?career=${selectedCareer}`)}`);
      return;
    }

    // 2. If already purchased, navigate straight to roadmap
    if (isAlreadyPurchased) {
      setLocation(`/roadmaps/${selectedCareer}`);
      return;
    }

    setLoadingPayment(true);

    try {
      await loadCashfreeScript();

      // 3. Create Cashfree Order on the backend
      const orderRes = await fetch(apiUrl("/api/payment/create-order"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          careerId: selectedCareer,
          frontendOrigin: typeof window !== "undefined" ? window.location.origin : undefined,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.message || "Failed to initialize payment order.");
      }

      if (!orderData.paymentSessionId) {
        throw new Error("No payment session received from server.");
      }

      if (!window.Cashfree) {
        throw new Error("Cashfree Checkout SDK failed to load. Please check your internet connection.");
      }

      // 4. Redirect on the SAME TAB where user clicked unlock
      const cashfree = window.Cashfree({
        mode: orderData.environment || "sandbox",
      });

      await cashfree.checkout({
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error("[Cashfree Checkout Error]:", err);
      toast({
        title: "Payment Not Completed",
        description: err.message || "Something went wrong during checkout. Please try again.",
        variant: "destructive",
      });
      setLoadingPayment(false);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0d0d0f] text-foreground -mt-20 pt-20 pb-20 -mb-20">
        {/* ── CINEMATIC HERO BANNER ───────────────────────────────── */}
        <section className="relative w-full overflow-hidden border-b border-white/5 bg-black/60">
          {/* Atmospheric Photography Background */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none select-none opacity-40"
            style={{
              backgroundImage: "url('/images/hero-cinematic.jpg')",
              backgroundPosition: "center 30%",
            }}
          />

          {/* Seamless Dark Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0f] via-[#0d0d0f]/85 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0f]/70 via-transparent to-[#0d0d0f] pointer-events-none" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16 text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 mb-4">
              LIFETIME ACCESS · ₹{ROADMAP_PRICE_INR}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-3">
              Simple Pricing for <span className="text-[#E69D43]">Career Clarity</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground/90 max-w-xl mx-auto leading-relaxed">
              One career at a time. Deep, honest guidance — not an overpriced recurring subscription.
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT CONTAINER ─────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* Pricing Card */}
          <div className="max-w-xl mx-auto">
            <div className="relative bg-[#131316] rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/80">
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#E69D43]/60 to-transparent" />

              <div className="p-7 sm:p-9 md:p-10">
                {/* Plan Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[11px] font-semibold text-[#E5A855] uppercase tracking-widest block mb-1">
                      Growvia Starter
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">One Career, Full Clarity</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Choose any 1 career — get everything for it.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-4xl sm:text-5xl font-extrabold text-white flex items-start justify-end">
                      <span className="text-lg text-amber-400 mt-1 mr-0.5">₹</span>{ROADMAP_PRICE_INR}
                    </div>
                    <div className="text-[11px] text-amber-300 font-medium bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full inline-block mt-1">
                      Lifetime access
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-white/[0.08] my-6" />

                {/* Features List */}
                <ul className="space-y-3 mb-7">
                  {pricingFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-amber-500/15 border border-amber-500/30 rounded-full p-0.5 text-amber-400 flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs sm:text-sm text-white/90 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="h-px w-full bg-white/[0.08] my-6" />

                {/* Career Selector */}
                <div className="mb-7">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs sm:text-sm font-semibold text-white">
                      Choose your career to unlock:
                      <span className="ml-1 text-amber-400">*</span>
                    </label>
                    {isAlreadyPurchased && (
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Already Unlocked
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                    {allCareers.map((career) => {
                      const isPurchased = Array.isArray(user?.purchasedRoadmaps) && user.purchasedRoadmaps.includes(career.id);
                      const isSelected = selectedCareer === career.id;
                      return (
                        <button
                          key={career.id}
                          type="button"
                          onClick={() => setSelectedCareer(career.id)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left text-xs font-medium transition-all ${
                            isSelected
                              ? "border-amber-500/50 bg-amber-500/10 text-white shadow-sm"
                              : "border-white/10 bg-[#16161a] text-muted-foreground hover:border-white/20 hover:text-white hover:bg-[#1a1a20]"
                          }`}
                        >
                          <CareerIcon
                            icon={career.icon}
                            size={15}
                            className={`flex-shrink-0 ${
                              isSelected ? "text-amber-400" : "text-muted-foreground"
                            }`}
                          />
                          <span className="truncate">{career.title}</span>
                          {isPurchased ? (
                            <span className="ml-auto text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                              ✓
                            </span>
                          ) : isSelected ? (
                            <Check className="w-3 h-3 text-amber-400 ml-auto flex-shrink-0" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                  {!selectedCareer && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Select a career above to continue.
                    </p>
                  )}
                </div>

                {/* CTA Unlock Button */}
                {isAlreadyPurchased ? (
                  <Button
                    size="lg"
                    asChild
                    className="w-full font-bold h-12 text-sm sm:text-base flex items-center justify-center gap-2 transition-all rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    <Link href={`/roadmaps/${selectedCareer}`}>
                      <span>View Unlocked Roadmap</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled={!selectedCareer || loadingPayment}
                    onClick={handleUnlockClick}
                    className={`w-full font-bold h-12 text-sm sm:text-base flex items-center justify-center gap-2 transition-all rounded-xl ${
                      selectedCareer && !loadingPayment
                        ? "bg-[#F5F0E6] text-black hover:bg-white shadow-xl shadow-black/50 cursor-pointer"
                        : "bg-white/10 text-white/40 cursor-not-allowed"
                    }`}
                  >
                    {loadingPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing Payment...</span>
                      </>
                    ) : selectedCareer ? (
                      <>
                        <span>Unlock {currentCareer?.title} Roadmap — ₹{ROADMAP_PRICE_INR}</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <span>Select a Career to Continue</span>
                    )}
                  </Button>
                )}

                <p className="text-center text-[11px] text-muted-foreground mt-3">
                  Instant lifetime access · Verified via Cashfree Secure Gateway
                </p>
              </div>
            </div>

            {/* Additional career note */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Want more careers later?{" "}
                <span className="text-white font-medium">Each additional career roadmap is also ₹{ROADMAP_PRICE_INR}.</span>
              </p>
            </div>
          </div>

          {/* Comparison summary cards */}
          <div className="max-w-3xl mx-auto mt-14 rounded-2xl border border-white/10 bg-[#131316] p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { label: "1 Career", value: `₹${ROADMAP_PRICE_INR}`, note: "One roadmap, full depth" },
              { label: "3 Careers", value: `₹${ROADMAP_PRICE_INR * 3}`, note: "Mix & compare paths" },
              { label: "All Careers", value: `₹${ROADMAP_PRICE_INR * 8}+`, note: "Explore everything" },
            ].map((item) => (
              <div key={item.label} className="p-3">
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <div className="text-xs font-semibold text-[#E69D43] mt-1">{item.label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{item.note}</div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  q: "Can I change my chosen career after purchase?",
                  a: "No, once unlocked, the roadmap is tied to the career you selected. Choose carefully — that's why we have the free Career Quiz!",
                },
                {
                  q: "Is this a monthly subscription?",
                  a: `No. It's a one-time payment. Pay ₹${ROADMAP_PRICE_INR} once, access your chosen career roadmap for life.`,
                },
                {
                  q: "What if I want to explore multiple careers?",
                  a: `Each career roadmap is ₹${ROADMAP_PRICE_INR}. Buy them one at a time as you narrow down your path. We think this is fairer than charging ₹500+ upfront.`,
                },
                {
                  q: "Do you offer refunds?",
                  a: `Due to the digital nature of content, we do not offer refunds. But we're confident the clarity you get will be worth far more than ₹${ROADMAP_PRICE_INR}.`,
                },
                {
                  q: "Can I take the quiz for free?",
                  a: "Yes! The Career Discovery Quiz is completely free. Use it to figure out which career roadmap to unlock.",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-[#131316] border border-white/10 rounded-2xl p-5">
                  <h4 className="text-sm font-semibold text-white mb-1.5">{faq.q}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
