"use client";

import Navbar from "@/components/Navbar";
import { useCities, useTours } from "@/hooks/useTours";
import { Tour } from "@/lib/api/tours";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const IMG_BASE = "https://talsuite2.s3.ap-south-1.amazonaws.com";

function TourCard({ tour, cityId }: { tour: Tour; cityId: number }) {
  return (
    <Link href={`/tours/${tour.ID}?cityId=${cityId}`} className="cursor-pointer group block">
      <div className="group-hover:scale-105 transition-transform duration-300">
        <div className="relative w-full aspect-video bg-brand-muted rounded-xl overflow-hidden border border-gray-300 shadow-lg">
          {tour.PhotoIMG ? (
            <Image
              src={`${IMG_BASE}${tour.PhotoIMG}`}
              alt={tour.Name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
        <div className="pt-3 flex gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-brand-ink">
              {tour.Name}
            </h3>
            <p className="text-xs text-brand-ink/50 mt-1 truncate">{tour.Theme}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ToursPage() {
  const { data: cities, isPending: citiesPending } = useCities();
  const [activeCityId, setActiveCityId] = useState<number | undefined>(undefined);

  // Default to first city once loaded
  useEffect(() => {
    if (cities && cities.length > 0 && activeCityId === undefined) {
      setActiveCityId(cities[0].ID);
    }
  }, [cities, activeCityId]);

  const {
    data,
    isPending: toursPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTours(activeCityId);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allTours: Tour[] = data?.pages.flatMap((p) => p.tours) ?? [];

  const scrollTabs = (dir: "left" | "right") => {
    tabsRef.current?.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-brand-bg">     
      <Navbar />

      {/* Hero */}
      <div className="px-6 md:px-10 mt-28 mb-8 max-w-2xl">
        <h1 className="font-serif text-5xl font-bold leading-tight text-brand-ink mb-4">
          Choose your walk,<br />let the city speak
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          Browse curated audio tours that guide you through the city&apos;s most iconic
          sites and hidden corners.
        </p>
      </div>

      {citiesPending && (
        <p className="text-gray-400 px-10 py-6">Loading cities…</p>
      )}

      {isError && (
        <p className="text-red-500 px-10 py-6">
          Error: {(error as Error).message}
        </p>
      )}

      {cities && cities.length > 0 && (
        <>
          {/* City tabs */}
          <div className="relative flex items-center px-6 md:px-10 mb-8">
            <button
              onClick={() => scrollTabs("left")}
              className="flex-none mr-1 w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition text-3xl leading-none"
              aria-label="Scroll tabs left"
            >
              ‹
            </button>
            <div
              ref={tabsRef}
              className="flex gap-2 overflow-x-auto flex-1 py-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cities.map((city) => (
                <button
                  key={city.ID}
                  onClick={() => setActiveCityId(city.ID)}
                  className={`flex-none whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    city.ID === activeCityId
                      ? "bg-brand-ink text-white" 
                      : "bg-gray-100 text-brand-ink hover:bg-gray-200"
                  }`}
                >
                  {city.Name}
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTabs("right")}
              className="flex-none ml-1 w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition text-3xl leading-none"
              aria-label="Scroll tabs right"
            >
              ›
            </button>
          </div>

          {/* Tours grid */}
          {toursPending ? (
            <p className="text-gray-400 px-10 py-6">Loading tours…</p>
          ) : (
            <section className="px-6 md:px-10 mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {allTours.map((tour) => (
                  <TourCard key={tour.ID} tour={tour} cityId={activeCityId!} />
                ))}
              </div>
            </section>
          )}

          <div ref={sentinelRef} className="h-10" />
          {isFetchingNextPage && (
            <p className="text-center text-sm text-gray-400 pb-12">
              Loading more…
            </p>
          )}
        </>
      )}
    </main>
  );
}
