import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Check, ChevronRight, Zap, ShieldCheck, Loader2, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { careers, pricingFeatures } from "@/lib/mock-data";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api-config";
import { CareerIcon } from "@/components/career-icon";

// Helper to dynamically load the Razorpay checkout script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
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

  // Pre-load Razorpay checkout script on page mount for instant modal opening
  useEffect(() => {
    loadRazorpayScript();
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

    // 2. If already purchased, take straight to dashboard
    if (isAlreadyPurchased) {
      setLocation(`/roadmaps/${selectedCareer}`);
      return;
    }

    setLoadingPayment(true);

    try {
      // Direct bypass mode: instantly add roadmap to user's profile on backend
      const unlockRes = await fetch(apiUrl("/api/payment/bypass-unlock"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ careerId: selectedCareer }),
      });

      const data = await unlockRes.json();

      if (!unlockRes.ok) {
        throw new Error(data.message || "Failed to unlock roadmap");
      }

      // Update client context and user state
      addPurchasedRoadmap(selectedCareer);
      await refreshUser();

      toast({
        title: "Roadmap Unlocked! 🎉",
        description: `You now have lifetime access to the ${currentCareer?.title} roadmap.`,
      });

      setLocation(`/dashboard?unlocked=${selectedCareer}`);
    } catch (err) {
      console.error("[Unlock Error]:", err);
      toast({
        title: "Unlock Failed",
        description: err.message || "Something went wrong while unlocking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple Pricing for <span className="text-primary">Career Clarity</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            One career at a time. Deep, honest guidance — not an overpriced recurring subscription.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-xl mx-auto">
          <div className="relative bg-card rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_60px_-12px_rgba(232,224,208,0.12)]">
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="p-8 md:p-10">
              {/* Plan Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                      Growvia Starter
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">One Career, Full Clarity</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose any 1 career — get everything for it.
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-5xl font-extrabold text-white flex items-start">
                    <span className="text-xl mt-2 mr-0.5">₹</span>99
                  </div>
                  <div className="text-xs text-primary/80 mt-1 font-medium bg-primary/10 px-2 py-0.5 rounded-full inline-block">
                    One-time · Lifetime access
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-white/10 my-7" />

              {/* Features */}
              <ul className="space-y-3.5 mb-8">
                {pricingFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/20 rounded-full p-0.5 text-primary flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="h-px w-full bg-white/10 my-7" />

              {/* Career Selector */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-white">
                    Choose your career to unlock:
                    <span className="ml-1 text-primary">*</span>
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
                    return (
                      <button
                        key={career.id}
                        type="button"
                        onClick={() => setSelectedCareer(career.id)}
                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-left text-sm font-medium transition-all ${
                          selectedCareer === career.id
                            ? "border-primary bg-primary/10 text-white shadow-sm"
                            : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-white"
                        }`}
                      >
                        <CareerIcon
                          icon={career.icon}
                          size={16}
                          className={`flex-shrink-0 ${
                            selectedCareer === career.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span className="truncate">{career.title}</span>
                        {isPurchased ? (
                          <span className="ml-auto text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                            ✓ Unlocked
                          </span>
                        ) : selectedCareer === career.id ? (
                          <Check className="w-3.5 h-3.5 text-primary ml-auto flex-shrink-0" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
                {!selectedCareer && (
                  <p className="text-xs text-muted-foreground mt-2.5">
                    Select a career above to continue.
                  </p>
                )}
              </div>

              {/* CTA Unlock Button */}
              {isAlreadyPurchased ? (
                <Button
                  size="lg"
                  asChild
                  className="w-full font-bold h-14 text-base sm:text-lg flex items-center justify-center gap-2 transition-all rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <Link href={`/roadmaps/${selectedCareer}`}>
                    <span>View Unlocked Roadmap</span>
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  disabled={!selectedCareer || loadingPayment}
                  onClick={handleUnlockClick}
                  className={`w-full font-bold h-14 text-base sm:text-lg flex items-center justify-center gap-2 transition-all rounded-2xl ${
                    selectedCareer && !loadingPayment
                      ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 cursor-pointer"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                >
                  {loadingPayment ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Unlocking Roadmap...</span>
                    </>
                  ) : selectedCareer ? (
                    <>
                      <span>Unlock {currentCareer?.title} Roadmap</span>
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </>
                  ) : (
                    <span>Select a Career to Continue</span>
                  )}
                </Button>
              )}

              <p className="text-center text-xs text-muted-foreground mt-4">
                Instant lifetime access · Added directly to your profile
              </p>
            </div>
          </div>

          {/* Additional career note */}
          <div className="mt-5 text-center">
            <p className="text-sm text-muted-foreground">
              Want more careers later?{" "}
              <span className="text-white font-medium">Each additional career roadmap is also ₹99.</span>
            </p>
          </div>
        </div>

        {/* Comparison note */}
        <div className="max-w-3xl mx-auto mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { label: "1 Career", value: "₹99", note: "One roadmap, full depth" },
            { label: "3 Careers", value: "₹297", note: "Mix & compare paths" },
            { label: "All Careers", value: "₹792+", note: "Explore everything" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-sm font-medium text-primary mt-1">{item.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.note}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-24">
          <h3 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              {
                q: "Can I change my chosen career after purchase?",
                a: "No, once unlocked, the roadmap is tied to the career you selected. Choose carefully — that's why we have the free Career Quiz!",
              },
              {
                q: "Is this a monthly subscription?",
                a: "No. It's a one-time payment. Pay ₹99 once, access your chosen career roadmap for life.",
              },
              {
                q: "What if I want to explore multiple careers?",
                a: "Each career roadmap is ₹99. Buy them one at a time as you narrow down your path. We think this is fairer than charging ₹500+ upfront.",
              },
              {
                q: "Do you offer refunds?",
                a: "Due to the digital nature of content, we do not offer refunds. But we're confident the clarity you get will be worth far more than ₹99.",
              },
              {
                q: "Can I take the quiz for free?",
                a: "Yes! The Career Discovery Quiz is completely free. Use it to figure out which career roadmap to unlock.",
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10 pb-6">
                <h4 className="text-base font-semibold text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
