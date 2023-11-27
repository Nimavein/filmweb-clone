/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActiveMediaFiltersType, TvSeries } from "@/types/types";
import { discoverTMDBUrl, seriesTMDBUrl } from "./urlHelper";

export const getTvSeriesData = async (
  sortBy = "vote_average.desc",
  filters?: ActiveMediaFiltersType,
  minVoteCount = "500",
  page = 1
) => {
  const { originalLanguage, genre, productionYear, providers } = filters || {};
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY || "",
    sort_by: sortBy,
    "vote_count.gte": minVoteCount,
    with_original_language: originalLanguage?.join("|") || "",
    with_genres: genre?.join("|") || "",
    first_air_date_year: productionYear?.join("|") || "",
    with_watch_providers: providers?.join("|") || "",
    watch_region: providers !== null ? "PL" : "",
    page: page.toString(),
  } as Record<string, string>);

  const url = `${discoverTMDBUrl}tv?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies ranking data");
  }
};

export const getUpcomingTvSeries = async (page = 1) => {
  try {
    const response = await fetch(
      `${seriesTMDBUrl}on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}&vote_count.gte=100`
    );
    const tvSeries: TvSeries = await response.json();
    return tvSeries;
  } catch (error: any) {
    console.error(error);
  }
};

export const getWatchProviderTvSeries = async (
  page: number,
  providerId: number | null,
  filterBy: string | null
) => {
  try {
    const response = await fetch(
      `${discoverTMDBUrl}tv?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}${
        providerId !== null ? `&with_watch_providers=${providerId}` : ""
      }${filterBy !== null ? `&sort_by=${filterBy}` : ""}&vote_count.gte=100`
    );
    const tvSeries: TvSeries = await response.json();
    return tvSeries;
  } catch (error: any) {
    console.error(error);
  }
};
