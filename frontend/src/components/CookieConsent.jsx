import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Cookie, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("honesvia_cookie_consent");
      if (!consent) {
        // Small delay so it appears smoothly after page load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access might fail in rare private browsing cases
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("honesvia_cookie_consent", "accepted");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 pointer-events-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-[#131316]/95 backdrop-blur-xl p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.7)] text-zinc-300">
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855] shrink-0 mt-0.5">
                <Cookie className="w-4 h-4" />
              </div>
              
              <div className="flex-1 text-xs leading-relaxed">
                <p className="font-semibold text-white mb-1">
                  Essential Cookies & Privacy
                </p>
                <p className="text-zinc-400">
                  We use cookies and local storage for essential session authentication and site functionality. We do not use third-party advertising tracking. Read our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#E5A855] underline hover:text-[#f3be7d] transition-colors font-medium"
                  >
                    Privacy Policy
                  </Link>.
                </p>

                <div className="mt-3.5 flex items-center gap-2.5">
                  <button
                    onClick={handleAccept}
                    className="px-4 py-1.5 rounded-lg bg-[#E5A855] hover:bg-[#c98e45] text-black font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Got it</span>
                  </button>
                  <Link
                    href="/privacy-policy"
                    className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-xs"
                  >
                    Learn more
                  </Link>
                </div>
              </div>

              <button
                onClick={handleAccept}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 -mr-1 -mt-1 cursor-pointer"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
