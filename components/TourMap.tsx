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
import type { TourStop } from "@/lib/api/tours";
import { cn } from "@/lib/utils";

const LIBERTY_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const BUILDINGS_LAYER_ID = "3d-buildings";

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

export default function TourMap({ stops }: { stops: TourStop[] }) {
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

  const bounds = useMemo<[[number, number], [number, number]] | null>(() => {
    if (points.length === 0) return null;
    let minLng = points[0].lng;
    let maxLng = points[0].lng;
    let minLat = points[0].lat;
    let maxLat = points[0].lat;
    for (const p of points) {
      if (p.lng < minLng) minLng = p.lng;
      if (p.lng > maxLng) maxLng = p.lng;
      if (p.lat < minLat) minLat = p.lat;
      if (p.lat > maxLat) maxLat = p.lat;
    }
    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ];
  }, [points]);

  if (points.length === 0) return null;

  const routeCoords: [number, number][] = points.map((p) => [p.lng, p.lat]);

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
      <MapRoute coordinates={routeCoords} color="#1A1A1A" width={3} opacity={0.9} />
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
