import { useState } from "react";
import { useLocation } from "wouter";
import { X, Play, Lock, CheckCircle2, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { getYouTubeEmbedUrl } from "@/lib/video-utils";

export function VideoPlayerModal({ video, isOpen, onClose, onUnlock }) {
  const [unlocked, setUnlocked] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  if (!isOpen || !video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.videoUrl);
  const isPaid = video.isPaid && !unlocked;

  const handleSimulatedUnlock = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in Required",
        description: "Please sign in or create an account to unlock masterclasses.",
      });
      if (onClose) onClose();
      const currentPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : "/videos";
      setLocation(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    setUnlocked(true);
    if (onUnlock) onUnlock(video);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#131316] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/70 hover:text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isPaid ? (
          /* ── PAID MASTERCLASS UNLOCK PROMPT ────────────────────────────────── */
          <div className="p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-5 shadow-lg shadow-amber-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Premium Masterclass
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {video.title}
            </h2>

            <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-6">
              Hosted by <span className="text-white font-medium">{video.mentor}</span> ({video.mentorRole}).
              This session includes unfiltered industry insights and private guidance.
            </p>

            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-sm text-muted-foreground">Session Fee:</span>
                <span className="text-2xl font-bold text-[#E69D43]">{video.price || "₹299"}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Full {video.duration || "45 mins"} high-definition session</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Verified roadmap alignment & industry reality check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Lifetime access from your student dashboard</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Button
                onClick={handleSimulatedUnlock}
                className="w-full bg-[#E69D43] hover:bg-[#E69D43]/90 text-black font-semibold h-12 rounded-xl text-base shadow-lg shadow-[#E69D43]/20"
              >
                Unlock Video Access ({video.price || "₹299"})
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full sm:w-auto border border-white/10 hover:bg-white/5 text-muted-foreground rounded-xl h-12"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        ) : (
          /* ── FREE / UNLOCKED VIDEO PLAYER ──────────────────────────────────── */
          <div>
            <div className="relative aspect-video bg-black">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <Play className="w-12 h-12 text-primary" />
                  <p className="text-sm text-muted-foreground">Direct video stream</p>
                  <Button asChild size="sm" variant="outline" className="border-white/20">
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                      Open Video in New Tab <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Free Access
                  </span>
                  {video.tag && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10">
                      {video.tag}
                    </span>
                  )}
                  {video.duration && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {video.duration}
                    </span>
                  )}
                </div>

                {video.careerTitle && (
                  <span className="text-xs text-primary font-medium">
                    {video.careerTitle}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-white mb-2 leading-snug">
                {video.title}
              </h2>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                  {video.mentor?.charAt(0) || "M"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{video.mentor}</p>
                  <p className="text-xs text-muted-foreground">{video.mentorRole}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
