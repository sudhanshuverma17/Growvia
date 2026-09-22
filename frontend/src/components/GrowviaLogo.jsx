import React from "react";
import { Link } from "wouter";

/**
 * Line-art hexagon logo icon containing stylized geometric 'G' mark.
 * Outline only, thin 1.5-2px stroke, modern cinematic editorial aesthetic.
 */
export function GrowviaLogoMark({ className = "w-7 h-7", strokeWidth = 1.8 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Hexagon Top-Right Roof Slant */}
      <path
        d="M 50 7 L 92 26"
        stroke="currentColor"
        strokeWidth={strokeWidth * 2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Outer Hexagon Body into G-shelf and upper diagonal */}
      <path
        d="M 50 7 L 8 26 V 74 L 50 93 L 92 74 V 50 H 77 L 50 37 L 40 39"
        stroke="currentColor"
        strokeWidth={strokeWidth * 2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Drop and Lower V Ribbon */}
      <path
        d="M 50 37 V 48 L 73 60 L 50 73 L 27 61"
        stroke="currentColor"
        strokeWidth={strokeWidth * 2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Full Growvia Brand Logo (Icon + Wordmark)
 */
export function GrowviaLogo({
  markClassName = "w-6 h-6 text-white",
  textClassName = "text-xl font-light tracking-[0.04em] text-white",
  href = "/",
  onClick,
}) {
  const content = (
    <div className="inline-flex items-center gap-2.5 group cursor-pointer select-none">
      <GrowviaLogoMark className={`${markClassName} transition-transform duration-300 group-hover:scale-105`} strokeWidth={1.8} />
      <span className={`${textClassName} transition-colors duration-200 group-hover:text-white/90`}>
        Growvia
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

export default GrowviaLogo;
