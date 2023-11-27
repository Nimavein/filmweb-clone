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
  const url = `${discoverTMDBUrl}tv?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&sort_by=${sortBy}&vote_count.gte=${minVoteCount}${
    originalLanguage ? `&with_original_language=${originalLanguage}` : ""
  }${genre ? `&with_genres=${genre}` : ""}${
    productionYear ? `&first_air_date_year=${productionYear}` : ""
  }${
    providers !== null
      ? `&with_watch_providers=${providers}&watch_region=PL&`
      : ""
  }&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tvSeries = await response.json();
    return tvSeries;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tv series ranking data");
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
