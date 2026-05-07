import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-brand-bg">
      {/* Subtle map texture background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/Assets/LeWalk_style_Assets/map.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 w-full py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* LEFT — Copy */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Headline */}
            <h1 className="font-serif font-bold text-[clamp(2.25rem,8vw,5.5rem)] leading-[1.05] text-brand-ink">
              India, finally{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-normal">explained</span>
                <span
                  className="absolute bottom-1 left-0 right-0 h-3 bg-brand-saffron/50 rounded"
                  aria-hidden="true"
                />
              </span>
              <br />
              as you walk
              <br />
              through it.
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-base md:text-xl text-brand-ink/60 leading-relaxed max-w-md">
              MyAudiotour triggers rich audio stories the moment you arrive at 1,000+ landmarks across 70+ Indian cities. No headphones required.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/tours"
                className="font-sans text-sm font-semibold text-brand-ink hover:text-brand-saffron transition-colors flex items-center gap-1.5"
              >
                Explore Tours 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT — Visual collage */}
          <div className="relative flex items-center justify-center lg:justify-end min-h-[420px] md:min-h-[520px] w-full">

            {/* Background landmark illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 opacity-15 rounded-full overflow-hidden">
                <Image
                  src="/Assets/LeWalk_style_Assets/taj-mahal.png"
                  alt=""
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* App mockup — center, floating */}
            <div className="relative z-10 animate-float drop-shadow-2xl">
              <div className="relative w-[180px] sm:w-[220px] md:w-[260px]">
                <Image
                  src="/Assets/Amy_Style_Assets/HomeScreen.png"
                  alt="MyAudioTour home screen"
                  width={260}
                  height={560}
                  className="rounded-[2.5rem] shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Stamp 1 — India Gate */}
            <div className="absolute top-4 left-2 sm:top-8 sm:left-4 md:left-10 z-20 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rotate-[-8deg] rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/Assets/LeWalk_style_Assets/india-gate.png"
                alt="India Gate"
                fill
                className="object-cover"
              />
            </div>

            {/* Stamp 2 — Golden Temple */}
            <div className="absolute bottom-8 left-2 sm:bottom-12 sm:left-0 md:left-4 z-20 w-14 h-14 sm:w-20 sm:h-20 rotate-[6deg] rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/Assets/LeWalk_style_Assets/golden-temple.png"
                alt="Golden Temple"
                fill
                className="object-cover"
              />
            </div>

            {/* Stamp 3 — Charminar */}
            <div className="absolute top-10 right-2 sm:top-16 md:right-0 z-20 w-16 h-16 sm:w-20 sm:h-20 md:w-[88px] md:h-[88px] rotate-[5deg] rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/Assets/LeWalk_style_Assets/charminar.png"
                alt="Charminar"
                fill
                className="object-cover"
              />
            </div>

            {/* Stamp 4 — Taj Mahal */}
            <div className="absolute bottom-4 right-2 sm:top-64 sm:bottom-auto sm:right-8 md:top-80 md:right-10 z-10 w-14 h-14 sm:w-20 sm:h-20 rotate-[-6deg] rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/Assets/LeWalk_style_Assets/taj-mahal.png"
                alt="Taj Mahal"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none" />
    </section>
  );
}
