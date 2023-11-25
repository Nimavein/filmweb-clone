/* eslint-disable @typescript-eslint/no-explicit-any */

import { TvSeries } from "@/types/types";
import { discoverTMDBUrl, seriesTMDBUrl } from "./urlHelper";

export const getPopularTvSeries = async (page: number) => {
  try {
    const response = await fetch(
      `${seriesTMDBUrl}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}&vote_count.gte=100`
    );
    const tvSeries: TvSeries = await response.json();
    return tvSeries;
  } catch (error: any) {
    console.error(error);
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
      `${discoverTMDBUrl}tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}${
        providerId !== null ? `&with_watch_providers=${providerId}` : ""
      }${filterBy !== null ? `&sort_by=${filterBy}` : ""}&vote_count.gte=100`
    );
    const tvSeries: TvSeries = await response.json();
    return tvSeries;
  } catch (error: any) {
    console.error(error);
  }
};
