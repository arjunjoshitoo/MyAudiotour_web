"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePlaceAudio, useTour } from "@/hooks/useTours";
import { TourStop } from "@/lib/api/tours";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const TourMap = dynamic(() => import("@/components/TourMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[900px] rounded-2xl border border-brand-muted-2 bg-brand-muted/30" />
  ),
});

const IMG_BASE = "https://talsuite2.s3.ap-south-1.amazonaws.com";

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white bg-black/40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/60 transition-colors"
        onClick={onClose}
        aria-label="Close preview"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function PhotoGrid({
  coverPhoto,
  stops,
  tourName,
}: {
  coverPhoto: string;
  stops: TourStop[];
  tourName: string;
}) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const sidePhotos = stops.filter((s) => s.PhotoIMG).slice(0, 2);
  const hasSide = sidePhotos.length >= 2;

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden h-[600px]">
        <div
          className={`grid h-full gap-1 ${hasSide ? "grid-cols-2" : "grid-cols-1"}`}
        >
          <div
            className="relative w-full h-full cursor-zoom-in"
            onClick={() => setLightbox({ src: `${IMG_BASE}${coverPhoto}`, alt: tourName })}
          >
            <Image
              src={`${IMG_BASE}${coverPhoto}`}
              alt={tourName}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {hasSide && (
            <div className="grid grid-rows-2 gap-1">
              {sidePhotos.map((stop) => (
                <div
                  key={stop.TourPlaceMapID}
                  className="relative w-full h-full cursor-zoom-in"
                  onClick={() => setLightbox({ src: `${IMG_BASE}${stop.PhotoIMG!}`, alt: stop.Name })}
                >
                  <Image
                    src={`${IMG_BASE}${stop.PhotoIMG}`}
                    alt={stop.Name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 28vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

function AudioPreview({ audioUrl }: { audioUrl: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const PREVIEW_SECS = 30;

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.currentTime >= PREVIEW_SECS) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mt-6 bg-white border border-brand-muted-2 rounded-full p-2 pr-5 flex items-center gap-4 ">
      <button
        onClick={toggle}
        className="flex-none w-20 h-20 rounded-full bg-brand-ink text-white flex items-center justify-center hover:bg-brand-ink/80 transition-colors shrink-0"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
            <rect x="5" y="4" width="4" height="16" rx="1" />
            <rect x="15" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <span className="text-sm text-brand-ink/70 block mb-2">
          Listen to a preview
        </span>
        <div className="h-1.5 bg-brand-muted rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-brand-ink rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-brand-ink/40 tabular-nums">
            {fmt(currentTime)}
          </span>
          <span className="text-xs text-brand-ink/40 tabular-nums">
            {fmt(duration)}
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={() => {
          const t = audioRef.current?.currentTime ?? 0;
          if (t >= PREVIEW_SECS) {
            audioRef.current!.pause();
            audioRef.current!.currentTime = PREVIEW_SECS;
            setIsPlaying(false);
          }
          setCurrentTime(Math.min(t, PREVIEW_SECS));
        }}
        onLoadedMetadata={() =>
          setDuration(Math.min(audioRef.current?.duration ?? 0, PREVIEW_SECS))
        }
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

function TourDetailsSkeleton() {
  return (
    <>
      {/* Hero: photo grid + tour info */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-8 mb-16">
        <div className="rounded-2xl h-[600px] bg-brand-muted/50 animate-pulse" />

        <div className="flex flex-col">
          <div className="h-14 bg-brand-muted/50 rounded mb-4 animate-pulse w-4/5" />
          <div className="flex flex-wrap gap-2 mb-5">
            <div className="h-8 w-36 bg-brand-muted/50 rounded-full animate-pulse" />
            <div className="h-8 w-28 bg-brand-muted/50 rounded-full animate-pulse" />
          </div>
          <div className="space-y-2 mb-6">
            <div className="h-3 bg-brand-muted/50 rounded animate-pulse" />
            <div className="h-3 bg-brand-muted/50 rounded animate-pulse" />
            <div className="h-3 bg-brand-muted/50 rounded animate-pulse w-4/5" />
            <div className="h-3 bg-brand-muted/50 rounded animate-pulse w-3/5" />
          </div>
          <div className="mt-6 h-24 bg-brand-muted/50 rounded-full animate-pulse" />
        </div>
      </div>

      {/* CTA placeholder */}
      <div className="mb-16 rounded-2xl h-[180px] bg-brand-muted/50 animate-pulse" />

      {/* Stops + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-12">
        <div>
          <div className="h-10 bg-brand-muted/50 rounded mb-8 animate-pulse w-4/5" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 pb-7">
              <div className="flex-none w-7 h-7 rounded-full bg-brand-muted/50 animate-pulse" />
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex-none w-32 h-24 rounded-xl bg-brand-muted/50 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-brand-muted/50 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-brand-muted/50 rounded animate-pulse" />
                  <div className="h-3 bg-brand-muted/50 rounded animate-pulse w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-fit">
          <div className="w-full h-[900px] rounded-2xl border border-brand-muted-2 bg-brand-muted/30" />
        </div>
      </div>
    </>
  );
}

function StopTimeline({ stops }: { stops: TourStop[] }) {
  return (
    <div>
      {stops.map((stop, index) => (
        <div key={stop.TourPlaceMapID} className="flex gap-4 relative">
          {/* Connecting line */}
          {index < stops.length - 1 && (
            <div className="absolute left-[13px] top-7 bottom-0 w-px bg-brand-muted-2 z-0" />
          )}

          {/* Number dot */}
          <div className="flex-none w-7 h-7 rounded-full bg-transparent text-brand-ink border border-brand-muted-2 text-xs font-semibold flex items-center justify-center relative z-10 mt-0.5 shrink-0">
            {stop.StopNo}
          </div>

          {/* Stop content */}
          <div className="flex items-start gap-3 pb-7 flex-1 min-w-0">
            {stop.PhotoIMG && (
              <div className="relative flex-none w-32 h-24 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={`${IMG_BASE}${stop.PhotoIMG}`}
                  alt={stop.Name}
                  fill
                  sizes="128px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-brand-ink text-sm leading-snug">
                {stop.Name}
              </h3>
              {stop.Description && (
                <p className="text-xs text-brand-ink/60 mt-1 leading-relaxed">
                  {stop.Description} 
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TourDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const cityId = Number(searchParams.get("cityId") ?? 0);

  const { data, isPending, isError, error } = useTour(Number(id), cityId);
  const tour = data?.tour;
  const stops = data?.stops ?? [];
  const routeSteps = data?.routeSteps ?? [];

  const startPlaceId = stops.find((s) => s.StopNo === 1)?.PlaceID;
  const { data: previewAudio } = usePlaceAudio(startPlaceId);

  return (
    <main className="min-h-screen bg-brand-bg ">
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-8 mt-20 md:mt-28 max-w-6xl mx-auto pb-20">
        {isPending && <TourDetailsSkeleton />}

        {isError && (
          <p className="text-red-500 py-12">
            Error: {(error as Error).message}
          </p>
        )}

        {tour && (
          <>
            {/* ── Hero: photo grid + tour info ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-8 mb-16">
              {/* Photo gallery */}
              {tour.PhotoIMG && (
                <PhotoGrid
                  coverPhoto={tour.PhotoIMG}
                  stops={stops}
                  tourName={tour.Name}
                />
              )}

              {/* Tour info */}
              <div className="flex flex-col">
                <h1 className="section-headline mb-4">{tour.Name}</h1>

                {/* Location + duration pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="flex items-center gap-1.5 text-sm text-brand-ink/70 bg-transparent px-3 py-1.5 border border-brand-muted-2 rounded-full">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2.2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {tour.City}, {tour.Country}
                  </span>

                  {tour.TourDuration && tour.TourDuration !== "0 mins" && (
                    <span className="flex items-center gap-1.5 text-sm text-brand-ink/70 bg-transparent px-3 py-1.5 border border-brand-muted-2 rounded-full">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2.2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {tour.TourDuration}
                    </span>
                  )}
                </div>

                {/* Description */}
                {tour.Description && (
                  <p className="text-brand-ink/70 leading-relaxed text-sm mb-6">
                    {tour.Description}
                  </p>
                )}
                {/* Audio preview */}
                {previewAudio && <AudioPreview audioUrl={previewAudio} />}
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="mb-16 rounded-2xl bg-brand-ink px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-serif font-bold text-white mb-1">
                  Book this Tour for free
                </h2>
                <p className="text-white/60 text-sm">
                  Download the app and start your self-guided tour today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href="https://apps.apple.com/us/app/myaudiotour-travel-guide/id6756263024"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/SVGs/Apple.svg"
                    alt="Download on the App Store"
                    className="h-12 w-auto"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.audiotour"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/SVGs/Google.svg"
                    alt="Get it on Google Play"
                    className="h-12 w-auto"
                  />
                </a>
              </div>
            </div>

            {/* ── Stops + Map ── */}
            {stops.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-12">
                {/* Stops timeline */}
                <div>
                  <h2 className="section-headline mb-8 text-[0px]">
                    <span className="text-4xl font-semibold"> 
                      What you&apos;ll walk and learn about
                    </span>
                  </h2>
                  <StopTimeline stops={stops} />
                </div>

                {/* Map (sticky) */}
                <div className="h-fit">
                  <TourMap stops={stops} routeSteps={routeSteps} />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
