/* eslint-disable @typescript-eslint/no-explicit-any */

import { GenresDTO, TvSeries } from "@/types/types";

export const getPopularTvSeries = async (page: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}&vote_count.gte=100`
    );
    const tvSeries: TvSeries = await response.json();
    return tvSeries;
  } catch (error: any) {
    console.error(error);
  }
};

export const getTvSeriesGenres = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_TV_GENRES_API_URL}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await response.json();
    const genres: GenresDTO = data.genres;
    return genres;
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
      `${process.env.NEXT_PUBLIC_BASE_API_URL}discover/tv?api_key=${
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
