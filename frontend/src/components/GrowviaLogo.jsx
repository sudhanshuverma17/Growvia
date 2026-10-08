import React from "react";
import { Link } from "wouter";

/**
 * Honesvia Logo Mark
 * The official stylized "H" monogram with curved pathway and champagne gold finish.
 */
export function HonesviaLogoMark({ className = "w-7 h-7" }) {
  return (
    <img
      src="/images/honesvia-icon.png?v=2"
      alt="Honesvia"
      className={`${className} object-contain select-none shrink-0`}
      loading="eager"
      decoding="async"
    />
  );
}

// Alias for backward compatibility across existing imports
export const GrowviaLogoMark = HonesviaLogoMark;

/**
 * Honesvia Logo (Icon Mark Only)
 * Used in the navigation bar to display only the stylized "H" logo mark without the name.
 */
export function HonesviaLogo({
  className,
  markClassName,
  href = "/",
  onClick,
}) {
  const finalClass = className || markClassName || "h-7 sm:h-8.5 w-auto";
  const content = (
    <div className="inline-flex items-center group cursor-pointer select-none">
      <HonesviaLogoMark
        className={`${finalClass} transition-transform duration-300 group-hover:scale-105 select-none shrink-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]`}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return content;
}

// Alias for backward compatibility across existing imports
export const GrowviaLogo = HonesviaLogo;

/**
 * Full Honesvia Brand Logo (Stacked Monogram Mark + Wordmark)
 * Used as the center watermark in the hero section.
 */
export function HonesviaFullLogo({
  className = "w-44 sm:w-56 md:w-64 lg:w-72 h-auto",
  alt = "Honesvia",
}) {
  return (
    <img
      src="/images/honesvia-logo.png?v=2"
      alt={alt}
      className={`${className} object-contain select-none shrink-0 pointer-events-none drop-shadow-[0_4px_32px_rgba(0,0,0,0.95)]`}
      loading="eager"
      decoding="async"
    />
  );
}

export const GrowviaFullLogo = HonesviaFullLogo;

export default HonesviaLogo;
