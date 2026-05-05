import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchCities, fetchPlaceAudio, fetchTour, fetchTours } from "@/lib/api/tours";

export function useCities(countryId = 1) {
  return useQuery({
    queryKey: ["cities", countryId],
    queryFn: () => fetchCities(countryId),
  });
}

export function useTour(tourId: number | undefined, cityId = 0) {
  return useQuery({
    queryKey: ["tour", tourId, cityId],
    queryFn: () => fetchTour(tourId!, cityId),
    enabled: tourId !== undefined,
  });
}

export function usePlaceAudio(placeId: number | undefined) {
  return useQuery({
    queryKey: ["place-audio", placeId],
    queryFn: () => fetchPlaceAudio(placeId!),
    enabled: placeId !== undefined,
  });
}

export function useTours(cityId: number | undefined) {
  return useInfiniteQuery({
    queryKey: ["tours", cityId],
    queryFn: ({ pageParam }) => fetchTours({ pageParam, cityId: cityId! }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.flatMap((p) => p.tours).length;
      return fetched < lastPage.totalRecordCount ? allPages.length + 1 : undefined;
    },
    enabled: cityId !== undefined,
  });
}
