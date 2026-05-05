"use client";

import { useMemo } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";
import type { TourStop } from "@/lib/api/tours";

export default function TourMap({ stops }: { stops: TourStop[] }) {
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
      theme="light"
      bounds={bounds ?? undefined}
      fitBoundsOptions={{ padding: 60 }}
      className="w-full h-[900px] rounded-2xl overflow-hidden border border-brand-muted-2"
    >
      <MapControls />
      <MapRoute coordinates={routeCoords} color="#1A1A1A" width={3} opacity={0.9} />
      {points.map((p) => (
        <MapMarker key={p.id} longitude={p.lng} latitude={p.lat}>
          <MarkerContent>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-ink text-white text-xs font-semibold border-2 border-white shadow-lg">
              {p.stopNo}
            </div>
          </MarkerContent>
          <MarkerTooltip>{p.name}</MarkerTooltip>
        </MapMarker>
      ))}
    </Map>
  );
}
