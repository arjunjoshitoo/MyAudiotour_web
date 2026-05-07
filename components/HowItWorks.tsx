"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    title: "Explore the full tour details",
    description:
      "Dive deeper into curated tours — see highlights, duration, and everything covered before you begin.",
    image: "/Assets/Amy_Style_Assets/Widgets/TourDetails.png",
    alt: "Tour details screen",
  },
  {
    title: "Learn the story, history & secrets",
    description:
      "Rich narration brings each place alive — the battles fought here, the kings who built it, the legends that linger.",
    image: "/Assets/Amy_Style_Assets/Widgets/PlayerScreen.png",
    alt: "Audio player screen",
  },
  {
    title: "Arrive at a landmark",
    description:
      "Walk up to any of 1,000+ monuments, forts, temples, or heritage sites in India's greatest cities.",
    image: "/Assets/Amy_Style_Assets/Widgets/NearbyScreen.png",
    alt: "Nearby landmarks screen",
  },
  {
    title: "GPS triggers your audio guide",
    description:
      "The app detects your exact location and automatically starts the right audio story — no searching, no tapping.",
    image: "/Assets/Amy_Style_Assets/Widgets/MapScreen.png",
    alt: "Map screen showing location",
  },
  {
    title: "Get directions to your next stop",
    description:
      "Navigate seamlessly between landmarks with turn-by-turn directions so you never lose your way.",
    image: "/Assets/Amy_Style_Assets/Widgets/DirectionScreen.png",
    alt: "Directions screen",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-brand-bg"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-10 md:mb-12">
          <span className="section-label">How It Works</span>
          <h2 className="font-serif font-bold text-[clamp(2.5rem,4.5vw,4rem)] leading-tight text-brand-ink mt-4 max-w-xl">
            Open the app.
            <br />
            Start walking.{" "}
            <span className="relative inline-block">
              <span className="relative z-10">That&apos;s it.</span>
              <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-brand-saffron/25 rounded" aria-hidden="true" />
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );

}
function StepCard({
  step,
  delay,
}: {
  step: (typeof steps)[0];
  delay: number;
}) {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className="flex flex-col"
    >
      {/* Screenshot thumbnail */}
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={step.image}
          alt={step.alt}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-contain rounded-3xl p-2"
        />
      </div>

      {/* Content */}
      <div className="-mt-10 text-center">
        <h3 className="font-serif text-3xl font-bold text-brand-ink mb-2">
          {step.title}
        </h3>
        <p className="font-sans text-sm text-brand-ink/60 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
