"use client";

import MapLibreGL, {
  type FitBoundsOptions,
  type LngLatBoundsLike,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

type MapProps = {
  children?: ReactNode;
  className?: string;
  /** MapLibre style URL */
  style: string;
  bounds?: LngLatBoundsLike;
  fitBoundsOptions?: FitBoundsOptions;
};

function Map({ children, className, style, bounds, fitBoundsOptions }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<MapLibreGL.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style,
      bounds,
      fitBoundsOptions,
      renderWorldCopies: false,
      attributionControl: { compact: true },
    });

    const onLoad = () => setIsLoaded(true);
    map.on("load", onLoad);
    setMapInstance(map);

    return () => {
      map.off("load", onLoad);
      map.remove();
      setMapInstance(null);
      setIsLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(
    () => ({ map: mapInstance, isLoaded }),
    [mapInstance, isLoaded],
  );

  return (
    <MapContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn("relative h-full w-full", className)}
      >
        {mapInstance && children}
      </div>
    </MapContext.Provider>
  );
}

type MarkerContextValue = {
  marker: MapLibreGL.Marker;
  map: MapLibreGL.Map | null;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}

function MapMarker({
  longitude,
  latitude,
  children,
}: {
  longitude: number;
  latitude: number;
  children: ReactNode;
}) {
  const { map } = useMap();

  const marker = useMemo(
    () =>
      new MapLibreGL.Marker({
        element: document.createElement("div"),
      }).setLngLat([longitude, latitude]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => {
      marker.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  const current = marker.getLngLat();
  if (current.lng !== longitude || current.lat !== latitude) {
    marker.setLngLat([longitude, latitude]);
  }

  return (
    <MarkerContext.Provider value={{ marker, map }}>
      {children}
    </MarkerContext.Provider>
  );
}

function MarkerContent({ children }: { children: ReactNode }) {
  const { marker } = useMarkerContext();
  return createPortal(
    <div className="relative cursor-pointer">{children}</div>,
    marker.getElement(),
  );
}

function MarkerTooltip({ children }: { children: ReactNode }) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);

  const tooltip = useMemo(
    () =>
      new MapLibreGL.Popup({
        offset: 16,
        closeOnClick: true,
        closeButton: false,
      }).setMaxWidth("none"),
    [],
  );

  useEffect(() => {
    if (!map) return;

    tooltip.setDOMContent(container);

    const handleEnter = () => {
      tooltip.setLngLat(marker.getLngLat()).addTo(map);
    };
    const handleLeave = () => tooltip.remove();

    const el = marker.getElement();
    el?.addEventListener("mouseenter", handleEnter);
    el?.addEventListener("mouseleave", handleLeave);

    return () => {
      el?.removeEventListener("mouseenter", handleEnter);
      el?.removeEventListener("mouseleave", handleLeave);
      tooltip.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return createPortal(
    <div className="bg-foreground text-background pointer-events-none rounded-md px-2 py-1 text-xs shadow-md">
      {children}
    </div>,
    container,
  );
}

function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex size-8 items-center justify-center transition-all",
        "first:rounded-t-md last:rounded-b-md hover:bg-accent",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
      )}
    >
      {children}
    </button>
  );
}

function MapControls({ className }: { className?: string }) {
  const { map } = useMap();

  const handleZoomIn = useCallback(
    () => map?.zoomTo(map.getZoom() + 1, { duration: 300 }),
    [map],
  );
  const handleZoomOut = useCallback(
    () => map?.zoomTo(map.getZoom() - 1, { duration: 300 }),
    [map],
  );

  return (
    <div className={cn("absolute bottom-10 right-2 z-10", className)}>
      <div className="border-border bg-background flex flex-col overflow-hidden rounded-md border shadow-sm [&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-border">
        <ControlButton onClick={handleZoomIn} label="Zoom in">
          <Plus className="size-4" />
        </ControlButton>
        <ControlButton onClick={handleZoomOut} label="Zoom out">
          <Minus className="size-4" />
        </ControlButton>
      </div>
    </div>
  );
}

type MapRouteProps = {
  coordinates: [number, number][];
  color?: string;
  width?: number;
  opacity?: number;
};

function MapRoute({
  coordinates,
  color = "#4285F4",
  width = 3,
  opacity = 0.8,
}: MapRouteProps) {
  const { map, isLoaded } = useMap();
  const autoId = useId();
  const sourceId = `route-source-${autoId}`;
  const layerId = `route-layer-${autoId}`;

  useEffect(() => {
    if (!isLoaded || !map) return;

    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: [] },
      },
    });

    map.addLayer({
      id: layerId,
      type: "line",
      source: sourceId,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": color,
        "line-width": width,
        "line-opacity": opacity,
      },
    });

    return () => {
      try {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, map]);

  useEffect(() => {
    if (!isLoaded || !map || coordinates.length < 2) return;
    const source = map.getSource(sourceId) as
      | MapLibreGL.GeoJSONSource
      | undefined;
    source?.setData({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates },
    });
  }, [isLoaded, map, coordinates, sourceId]);

  useEffect(() => {
    if (!isLoaded || !map || !map.getLayer(layerId)) return;
    map.setPaintProperty(layerId, "line-color", color);
    map.setPaintProperty(layerId, "line-width", width);
    map.setPaintProperty(layerId, "line-opacity", opacity);
  }, [isLoaded, map, layerId, color, width, opacity]);

  return null;
}

export {
  Map,
  useMap,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapControls,
  MapRoute,
};
