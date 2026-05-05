"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const reviews = [
  {
    stars: 5,
    name: "Priya M.",
    location: "Delhi",
    text: "Visited Qutub Minar a dozen times and never knew half the history. MyAudioTour changed that on my very first use. Absolutely brilliant.",
  },
  {
    stars: 5,
    name: "Rahul K.",
    location: "Bangalore",
    text: "I was skeptical about yet another travel app. But the GPS trigger actually works — I walked into the fort and it just started. No fuss. Genuinely impressive.",
  },
  {
    stars: 5,
    name: "Sunita P.",
    location: "Jaipur",
    text: "Finally an app that treats Indian heritage seriously. The audio is well-researched, the app is beautiful, and it's completely free. What more could you want?",
  },
];

export default function SocialProof() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-brand-bg"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="section-label">Reviews</span>
          <h2 className="font-serif font-bold text-[clamp(2rem,3.5vw,3rem)] text-brand-ink mt-4">
            People are talking.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  delay,
}: {
  review: (typeof reviews)[0];
  delay: number;
}) {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className="bg-white rounded-2xl p-7 border border-brand-muted shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(review.stars)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F5A623">
            <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.5l-3.7 1.8.7-4.1-3-2.9 4.2-.7z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-serif text-base md:text-lg text-brand-ink/80 leading-relaxed mb-5">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      {/* Reviewer */}
      <div className="flex items-center gap-3 pt-4 border-t border-brand-muted">
        <div className="w-8 h-8 rounded-full bg-brand-saffron/20 flex items-center justify-center flex-shrink-0">
          <span className="font-serif font-bold text-brand-saffron text-sm">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-brand-ink">{review.name}</p>
          <p className="font-sans text-xs text-brand-ink/40">{review.location} · App Store</p>
        </div>
      </div>
    </div>
  );
}
