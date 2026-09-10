import React from "react";

export function PageLoader({ label = "Loading Growvia..." }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
      <div className="relative mb-4">
        {/* Glow backdrop */}
        <div className="absolute -inset-2 rounded-full bg-primary/20 blur-lg animate-pulse" />
        {/* Spinner rings */}
        <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-primary animate-spin" />
        <div className="absolute inset-0 m-auto w-6 h-6 rounded-md bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-display font-bold text-xs">
          G
        </div>
      </div>
      <p className="text-xs font-medium text-muted-foreground tracking-wide">{label}</p>
    </div>
  );
}

export default PageLoader;
