"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerTooltip,
  useMap,
} from "@/components/ui/map";
import type { RouteStep, TourStop } from "@/lib/api/tours";
import { cn } from "@/lib/utils";

const LIBERTY_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const BUILDINGS_LAYER_ID = "3d-buildings";

// Google encoded polyline → array of [lng, lat] pairs (precision 5).
function decodePolyline(str: string): [number, number][] {
  const coords: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < str.length) {
    let b: number;
    let shift = 0;
    let result = 0;
    do {
      b = str.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      b = str.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    coords.push([lng / 1e5, lat / 1e5]);
  }

  return coords;
}

function ThreeDLayer({ enabled }: { enabled: boolean }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    if (enabled) {
      if (!map.getLayer(BUILDINGS_LAYER_ID) && map.getSource("openmaptiles")) {
        // Insert before the first text label so labels stay readable on top of buildings.
        const layers = map.getStyle().layers ?? [];
        const labelLayer = layers.find(
          (l) => l.type === "symbol" && (l.layout as { "text-field"?: unknown })?.["text-field"],
        );

        try {
          map.addLayer(
            {
              id: BUILDINGS_LAYER_ID,
              source: "openmaptiles",
              "source-layer": "building",
              type: "fill-extrusion",
              minzoom: 14,
              paint: {
                "fill-extrusion-color": "#d6d0c4",
                "fill-extrusion-height": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  14,
                  0,
                  16,
                  ["coalesce", ["get", "render_height"], 0],
                ],
                "fill-extrusion-base": [
                  "case",
                  [">=", ["zoom"], 16],
                  ["coalesce", ["get", "render_min_height"], 0],
                  0,
                ],
                "fill-extrusion-opacity": 0.85,
              },
            },
            labelLayer?.id,
          );
        } catch {
          // style may not have building source-layer; ignore
        }
      }
      map.easeTo({ pitch: 60, duration: 600 });
    } else {
      if (map.getLayer(BUILDINGS_LAYER_ID)) {
        map.removeLayer(BUILDINGS_LAYER_ID);
      }
      map.easeTo({ pitch: 0, duration: 600 });
    }
  }, [enabled, map, isLoaded]);

  return null;
}

function ThreeDToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle 3D view"
      aria-pressed={enabled}
      className={cn(
        "absolute top-2 right-2 z-10 h-8 px-3 rounded-md border text-xs font-semibold shadow-sm transition-colors",
        enabled
          ? "bg-brand-ink text-white border-brand-ink hover:bg-brand-ink/90"
          : "bg-background border-border hover:bg-accent",
      )}
    >
      3D
    </button>
  );
}

export default function TourMap({
  stops,
  routeSteps = [],
}: {
  stops: TourStop[];
  routeSteps?: RouteStep[];
}) {
  const [is3D, setIs3D] = useState(false);

  const points = useMemo(
    () =>
      stops
        .filter((s) => Number.isFinite(s.Lat) && Number.isFinite(s.Long))
        .map((s) => ({
          id: s.TourPlaceMapID,
          lng: s.Long,
          lat: s.Lat,
          stopNo: s.StopNo,
          name: s.Name,
        })),
    [stops],
  );

  // For each stop in StopNo order, walk its routing steps (sorted by OrdPos),
  // decode each step's polyline, and stitch them end-to-end. Skips duplicate
  // joint vertices where one segment ends where the next begins. Falls back to
  // straight lines through stop points if no routing data is available.
  const routeCoords = useMemo<[number, number][]>(() => {
    const stepsByStopId: Record<number, RouteStep[]> = {};
    for (const step of routeSteps) {
      (stepsByStopId[step.NextTourPlaceMapID] ??= []).push(step);
    }

    const out: [number, number][] = [];
    const orderedStops = [...stops].sort((a, b) => a.StopNo - b.StopNo);
    for (const stop of orderedStops) {
      const segments = (stepsByStopId[stop.TourPlaceMapID] ?? [])
        .slice()
        .sort((a: RouteStep, b: RouteStep) => a.OrdPos - b.OrdPos);
      for (const step of segments) {
        for (const c of decodePolyline(step.Polyline)) {
          const last = out[out.length - 1];
          if (!last || last[0] !== c[0] || last[1] !== c[1]) out.push(c);
        }
      }
    }

    if (out.length === 0) {
      return points.map((p) => [p.lng, p.lat] as [number, number]);
    }
    return out;
  }, [stops, routeSteps, points]);

  const bounds = useMemo<[[number, number], [number, number]] | null>(() => {
    if (points.length === 0) return null;
    let minLng = points[0].lng;
    let maxLng = points[0].lng;
    let minLat = points[0].lat;
    let maxLat = points[0].lat;
    const extend = (lng: number, lat: number) => {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    };
    for (const p of points) extend(p.lng, p.lat);
    for (const [lng, lat] of routeCoords) extend(lng, lat);
    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ];
  }, [points, routeCoords]);

  if (points.length === 0) return null;

  return (
    <Map
      style={LIBERTY_STYLE}
      bounds={bounds ?? undefined}
      fitBoundsOptions={{ padding: 60 }}
      className="w-full h-[1000px] rounded-2xl overflow-hidden shadow-xl"
    >
      <MapControls />
      <ThreeDToggle enabled={is3D} onToggle={() => setIs3D((v) => !v)} />
      <ThreeDLayer enabled={is3D} />
      <MapRoute coordinates={routeCoords} color="#2563EB" width={3} opacity={0.9} />
      {points.map((p) => (
        <MapMarker key={p.id} longitude={p.lng} latitude={p.lat}>
          <MarkerContent>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-brand-ink text-xs font-semibold border-2 border-brand-muted-2 shadow-lg">
              {p.stopNo}
            </div>
          </MarkerContent>
          <MarkerTooltip>{p.name}</MarkerTooltip>
        </MapMarker>
      ))}
    </Map>
  );
}
