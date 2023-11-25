/* eslint-disable @typescript-eslint/no-explicit-any */

import { GenresDTO, Movies } from "@/types/types";
import { discoverTMDBUrl, movieTMDBUrl, moviesGenresTMDBUrl } from "./urlHelper";

export const getPopularMovies = async (page: number) => {
  try {
    const response = await fetch(
      `${movieTMDBUrl}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    const movies: Movies = await response.json();
    return movies;
  } catch (error: any) {
    console.error(error);
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${movieTMDBUrl}upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    const movies: Movies = await response.json();
    return movies;
  } catch (error: any) {
    console.error(error);
  }
};

export const getWatchProviderMovies = async (
  page: number,
  providerId: number | null,
  filterBy: string | null
) => {
  try {
    const response = await fetch(
      `${discoverTMDBUrl}movie?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}${
        providerId !== null ? `&with_watch_providers=${providerId}` : ""
      }${filterBy !== null ? `&sort_by=${filterBy}` : ""}&vote_count.gte=100`
    );
    const movies: Movies = await response.json();
    return movies;
  } catch (error: any) {
    console.error(error);
  }
};
