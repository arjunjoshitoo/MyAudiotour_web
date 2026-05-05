"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    title: "GPS auto-trigger",
    description: "No tapping required. The audio starts the moment you arrive.",
    image: "/Assets/Amy_Style_Assets/Widgets/MapScreen.png",
    accent: "bg-brand-teal/10",
    plain: true,
  },
  {
    title: "70+ cities covered",
    description: "From Delhi to Kochi, Jaipur to Kolkata.",
    image: "/Assets/LeWalk_style_Assets/india-cities.png",
    accent: "bg-brand-saffron/10",
    plain: false,
  },
  {
    title: "Offline mode",
    description: "Download your city tour before you travel. Works without internet.",
    image: "/Assets/Amy_Style_Assets/Widgets/TourDetails.png",
    accent: "bg-brand-muted",
    plain: true,
  },
  {
    title: "100% Free forever",
    description: "No subscription, no in-app purchase, no catch.",
    image: null,
    accent: "bg-brand-saffron",
    plain: false,
  },
  {
    title: "Historical deep dives",
    description: "Every audio is researched. Not Wikipedia summaries — real stories.",
    image: "/Assets/Amy_Style_Assets/Widgets/PlayerScreen.png",
    accent: "bg-brand-ink/5",
    plain: true,
  },
  {
    title: "Walk at your own pace",
    description: "No group. No guide. No schedule. Just you and the story.",
    image: "/Assets/LeWalk_style_Assets/varanasi.png",
    accent: "bg-brand-teal/10",
    plain: false,
  },
  {
    title: "Direction guidance",
    description: "Step-by-step walking directions between landmarks.",
    image: "/Assets/Amy_Style_Assets/Widgets/DirectionScreen.png",
    accent: "bg-brand-muted",
    plain: true,
  },
];

export default function FeatureShowcase() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-36 bg-brand-muted/40"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-label">What Makes It Different</span>
            <h2 className="font-serif font-bold text-[clamp(2.2rem,4vw,3.5rem)] leading-tight text-brand-ink mt-4 max-w-lg">
              Not a tour.{" "}
              <span className="relative inline-block">
                <span className="relative z-10">A story</span>
                <span className="absolute bottom-0.5 left-0 right-0 h-2 bg-brand-saffron/30 rounded" aria-hidden="true" />
              </span>{" "}
              that follows you.
            </h2>
          </div>
          <p className="font-sans text-sm text-brand-ink/50 max-w-xs md:text-right leading-relaxed">
            Everything is automatic. Everything is free. Everything is made for how real people explore.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 auto-rows-auto gap-4">
          {/* Row 1: large + medium + medium */}
          <FeatureCard feature={features[0]} delay={0} />
          <FeatureCard feature={features[2]} delay={160} />
          <FeatureCard feature={features[4]} delay={80} />
          <FeatureCard feature={features[6]} delay={400} />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  className = "",
  delay,
}: {
  feature: (typeof features)[0];
  className?: string;
  delay: number;
}) {
  const ref = useScrollAnimation();

  const cardStyle = feature.plain
    ? "group relative rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
    : "group relative rounded-2xl overflow-hidden bg-white border border-brand-muted shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${cardStyle} ${className}`}
    >
      {feature.image && feature.plain && (
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-contain rounded-3xl p-2 group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
    </div>
  );
}

