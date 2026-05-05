import Image from "next/image";

const screens = [
  { src: "/Assets/Screens/HomeScreen.png", alt: "Home screen", rotate: "-rotate-[6deg]", zIndex: "z-10", mt: "mt-0" },
  { src: "/Assets/Screens/NearbyScreen.png", alt: "Nearby landmarks", rotate: "-rotate-[2deg]", zIndex: "z-20", mt: "-mt-4" },
  { src: "/Assets/Screens/PlayerScreen.png", alt: "Audio player", rotate: "rotate-0", zIndex: "z-30", mt: "-mt-8" },
  { src: "/Assets/Screens/MapScreen.png", alt: "Map view", rotate: "rotate-[2deg]", zIndex: "z-20", mt: "-mt-4" },
  { src: "/Assets/Screens/DirectionScreen.png", alt: "Directions", rotate: "rotate-[6deg]", zIndex: "z-10", mt: "mt-0" },
];

export default function ScreensShowcase() {
  return (
    <section
      className="relative py-24 md:py-36 bg-brand-bg overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.06]">
        <Image
          src="/Assets/LeWalk_style_Assets/india-gate.png"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #FAFAF8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 text-center">
        {/* Headline */}
        <span className="section-label text-brand-ink/30">The App</span>
        <h2 className="font-serif font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-brand-ink mt-4 mb-6">
          Every city.{" "}
          <span className="text-brand-saffron">Every story.</span>
          <br />
          In your pocket.
        </h2>
        <p className="font-sans text-base md:text-lg text-brand-ink/40 max-w-md mx-auto mb-16 md:mb-20">
          Designed to stay out of your way and let the stories do the work.
        </p>

        {/* Screens collage */}
        <div className="flex items-end justify-center gap-2 md:gap-4">
          {screens.map((screen, i) => (
            <div
              key={i}
              className={`relative flex-shrink-0 ${screen.rotate} ${screen.zIndex} ${screen.mt}
                w-[100px] md:w-[150px] lg:w-[180px]
                transition-transform duration-300 hover:scale-105 hover:z-40`}
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                width={180}
                height={390}
                className="rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-2 border-white/10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
