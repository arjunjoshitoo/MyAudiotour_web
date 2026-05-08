export interface Tour {
  ID: number;
  Name: string;
  Description: string;
  PhotoIMG: string;
  TourDuration: string;
  TourDistance: string;
  City: string;
  Country: string;
  PlaceCount: number;
  Theme: string;
  StartPlace: string;
  StartPlaceDistanceInKMs: number;
  StartPlaceLat: number;
  StartPlaceLong: number;
}

export interface TourDetail {
  ID: number;
  Name: string;
  Description: string;
  PhotoIMG: string;
  TourDuration: string;
  TourDistance: string;
  City: string;
  Country: string;
  Column1: number; // stop count
  Theme: string;
  StartPlace: string;
  StartPlaceDistance: string;
  StartPlaceLat: number;
  StartPlaceLong: number;
}

export interface TourStop {
  StopNo: number;
  TourPlaceMapID: number;
  PlaceID: number;
  Name: string;
  Description: string;
  AudioURL: string;
  PhotoIMG: string;
  Lat: number;
  Long: number;
  DistanceKM: string | null;
  Duration: string | null;
  IsCurrentInProgress: number;
  AudioProgressSecs: number;
}

// Turn-by-turn routing step. Steps with the same NextTourPlaceMapID, sorted by
// OrdPos, form the path from the previous stop to that stop. Polyline is a
// Google encoded polyline (precision 5).
export interface RouteStep {
  NextTourPlaceMapID: number;
  OrdPos: number;
  Polyline: string;
}

export interface TourDetailsResponse {
  tour: TourDetail;
  stops: TourStop[];
  routeSteps: RouteStep[];
}

export interface ToursResponse {
  tours: Tour[];
  totalRecordCount: number;
}

export interface City {
  ID: number;
  Name: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
const DEFAULT_LAT = "28.6139";
const DEFAULT_LONG = "77.2088";

export async function fetchCities(countryId = 1): Promise<City[]> {
  const body = new URLSearchParams({
    APIKey: API_KEY,
    CountryID: String(countryId),
  });

  const res = await fetch(`${API_BASE}/meta-cities`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) throw new Error(`meta-cities failed: ${res.status}`);
  return res.json();
}

export async function fetchTour(
  tourId: number,
  cityId = 0
): Promise<TourDetailsResponse> {
  const body = new URLSearchParams({
    APIKey: API_KEY,
    TourID: String(tourId),
    CurrentCityID: String(cityId),
    CurrentLat: DEFAULT_LAT,
    CurrentLong: DEFAULT_LONG,
    LanguageID: "1",
  });

  const res = await fetch(`${API_BASE}/tours-details`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) throw new Error(`tours-details failed: ${res.status}`);

  // The endpoint returns 4 arrays: [tour], [stops], [routeSteps], [reviews].
  const data: [TourDetail[], TourStop[], RouteStep[], unknown] = await res.json();
  // Drop placeholder "next tour" entries (TourPlaceMapID === -1) — not part of the route.
  const stops = data[1].filter((s) => s.TourPlaceMapID !== -1);
  return { tour: data[0][0], stops, routeSteps: data[2] ?? [] };
}

export async function fetchPlaceAudio(placeId: number): Promise<string | null> {
  const body = new URLSearchParams({
    APIKey: API_KEY,
    PlaceID: String(placeId),
    LanguageID: "1",
  });

  const res = await fetch(`${API_BASE}/place-audio`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) throw new Error(`place-audio failed: ${res.status}`);
  const data: [{ AudioURL: string }] = await res.json();
  return data[0]?.AudioURL ?? null;
}

export async function fetchTours({
  pageParam = 1,
  cityId,
}: {
  pageParam?: number;
  cityId: number;
}): Promise<ToursResponse> {
  const body = new URLSearchParams({
    APIKey: API_KEY,
    CountryID: "1",
    CityID: String(cityId),
    TransportModeID: "-1",
    Theme: "",
    Search: "",
    SortBy: "",
    PageNo: String(pageParam),
    PageSize: "50",
    CurrentCityID: String(cityId),
    CurrentLat: DEFAULT_LAT,
    CurrentLong: DEFAULT_LONG,
    IsPurchased: "false",
  });

  const res = await fetch(`${API_BASE}/tours-list`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) throw new Error(`tours-list failed: ${res.status}`);

  const data: [Tour[], [{ TotalRecordCount: number }]] = await res.json();
  return {
    tours: data[0],
    totalRecordCount: data[1][0].TotalRecordCount,
  };
}
