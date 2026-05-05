"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function FounderSection() {
  const sectionRef = useScrollAnimation();
  const photoRef = useScrollAnimation();

  return (
    <section
      id="about"
      className="py-24 md:py-36 bg-brand-bg"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT — Copy */}
          <div
            ref={sectionRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col gap-6"
          >
            <span className="section-label">Built by One Person</span>

            <h2 className="font-serif font-bold text-[clamp(2.5rem,4vw,3.8rem)] leading-tight text-brand-ink">
              Hi, I&apos;m Arjun 👋
            </h2>

            <div className="flex flex-col gap-4 font-sans text-base md:text-lg text-brand-ink/65 leading-relaxed">
              <p>
                I built MyAudioTour because every time I visited a monument in India, I wished I had a knowledgeable friend walking beside me — someone who could explain what I was actually looking at.
              </p>
              <p>
                Tour guides are expensive. Most audio guide apps charge ₹500 or more per city. I wanted something free, beautiful, and actually worth using.
              </p>
              <p>
                So I built it myself — 70+ cities, 1,000+ landmarks, completely free. Because every Indian deserves to truly understand the places that shaped their history.
              </p>
            </div>

            {/* Signature */}
            <div className="flex items-center gap-4 pt-4 border-t border-brand-muted">
              <div className="w-10 h-10 rounded-full bg-brand-saffron/20 flex items-center justify-center">
                <span className="font-serif font-bold text-brand-saffron text-lg">A</span>
              </div>
              <div>
                <p className="font-serif font-bold text-brand-ink text-sm">Arjun</p>
                <p className="font-sans text-xs text-brand-ink/40 tracking-wide">Indie Developer · Jaipur</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Photo collage */}
          <div
            ref={photoRef as React.RefObject<HTMLDivElement>}
            className="relative flex items-center justify-center min-h-[420px]"
          >
            {/* Main landmark image */}
            <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl rotate-[-2deg]">
              <Image
                src="/Assets/LeWalk_style_Assets/jk-temple.png"
                alt="Indian heritage site"
                fill
                className="object-cover"
              />
            </div>

            {/* Overlapping small image 1 */}
            <div className="absolute bottom-4 right-4 md:right-0 w-44 h-36 rounded-xl overflow-hidden shadow-xl rotate-[4deg] border-4 border-white">
              <Image
                src="/Assets/LeWalk_style_Assets/golden-city.png"
                alt="Golden city"
                fill
                className="object-cover"
              />
            </div>

            {/* Overlapping small image 2 */}
            <div className="absolute top-4 right-6 md:right-2 w-32 h-28 rounded-xl overflow-hidden shadow-lg rotate-[-5deg] border-4 border-white">
              <Image
                src="/Assets/LeWalk_style_Assets/varanasi.png"
                alt="Varanasi ghats"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative element */}
            <div className="absolute top-0 left-0 w-16 h-16 opacity-60 rotate-[12deg]">
              <Image
                src="/Assets/LeWalk_style_Assets/asset-03.png"
                alt=""
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
