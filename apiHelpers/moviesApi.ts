/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActiveMediaFiltersType, Movies } from "@/types/types";
import { movieTMDBUrl, moviesApi } from "./urlHelper";

export const getMoviesData = async (
  sortBy = "vote_average.desc",
  filters?: ActiveMediaFiltersType,
  minVoteCount = "500",
  page = 1
) => {
  const url = moviesApi.getMoviesData(sortBy, filters, minVoteCount, page);

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
