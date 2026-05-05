"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function DownloadCTA() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 md:py-36 bg-brand-saffron overflow-hidden"
    >
      {/* Background landmark silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center gap-8 opacity-10 pointer-events-none">
        {[
          "/Assets/LeWalk_style_Assets/taj-mahal.png",
          "/Assets/LeWalk_style_Assets/india-gate.png",
          "/Assets/LeWalk_style_Assets/qutub-minar.png",
          "/Assets/LeWalk_style_Assets/charminar.png",
          "/Assets/LeWalk_style_Assets/golden-temple.png",
        ].map((src, i) => (
          <div key={i} className="relative w-24 h-32 md:w-32 md:h-40">
            <Image src={src} alt="" fill className="object-contain object-bottom" />
          </div>
        ))}
      </div>

      {/* Decorative asset */}
      <div className="absolute top-8 right-12 opacity-20 rotate-[15deg]">
        <Image
          src="/Assets/LeWalk_style_Assets/asset-05.png"
          alt=""
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-12 left-10 opacity-15 rotate-[-10deg]">
        <Image
          src="/Assets/LeWalk_style_Assets/asset-07.png"
          alt=""
          width={60}
          height={60}
          className="object-contain"
        />
      </div>

      <div className="relative max-w-[800px] mx-auto px-6 md:px-10 text-center flex flex-col items-center gap-8">
        {/* App icon */}
        <div className="w-20 h-20 rounded-2xl bg-brand-ink flex items-center justify-center shadow-xl">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="8" fill="white" />
            <path d="M18 4 L18 10 M18 26 L18 32 M4 18 L10 18 M26 18 L32 18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Headline */}
        <h2 className="font-serif font-bold text-[clamp(2.8rem,5.5vw,5rem)] leading-tight text-brand-ink">
          Start your first
          <br />
          tour today.
        </h2>

        <p className="font-sans text-base md:text-lg text-brand-ink/60 max-w-sm">
          Free. No signup. Just open and walk.
        </p>

        {/* CTA */}
        <a
          href="https://apps.apple.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-brand-ink text-white px-8 py-4 rounded-full font-sans font-semibold text-base hover:bg-brand-ink/80 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Download on the App Store
        </a>

        <p className="font-sans text-xs text-brand-ink/40 tracking-wide">
          Available free on iOS · 70+ cities · 1,000+ landmarks
        </p>
      </div>
    </section>
  );
}
