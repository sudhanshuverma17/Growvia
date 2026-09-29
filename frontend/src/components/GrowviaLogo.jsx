import React from "react";
import { Link } from "wouter";

/**
 * Honesvia Logo Mark
 * The distinctive hexagon icon containing the stylized path and sparkle star.
 */
export function HonesviaLogoMark({ className = "w-7 h-7" }) {
  return (
    <img
      src="/images/honesvia-icon.png"
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
 * Full Honesvia Brand Logo (Icon + Wordmark)
 * Wordmark uses the champagne gold gradient and typography matching the official brand identity.
 */
export function HonesviaLogo({
  markClassName = "w-7 h-7",
  textClassName = "text-xl font-bold tracking-tight bg-gradient-to-r from-white via-[#F5EAD9] to-[#E3BE8A] bg-clip-text text-transparent",
  href = "/",
  onClick,
}) {
  const content = (
    <div className="inline-flex items-center gap-2.5 group cursor-pointer select-none">
      <HonesviaLogoMark
        className={`${markClassName} transition-transform duration-300 group-hover:scale-105`}
      />
      <span
        className={`${textClassName} transition-opacity duration-200 group-hover:opacity-90 font-['Outfit',sans-serif]`}
      >
        Honesvia
      </span>
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

export default HonesviaLogo;
