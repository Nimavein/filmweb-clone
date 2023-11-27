/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActiveMediaFiltersType, Movies } from "@/types/types";
import { discoverTMDBUrl, movieTMDBUrl } from "./urlHelper";

export const getMoviesData = async (
  sortBy = "vote_average.desc",
  filters?: ActiveMediaFiltersType,
  minVoteCount = "500",
  page = 1
) => {
  const { originalLanguage, genre, productionYear, providers } = filters || {};
  const url = `${discoverTMDBUrl}movie?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&sort_by=${sortBy}&vote_count.gte=${minVoteCount}${
    originalLanguage ? `&with_original_language=${originalLanguage}` : ""
  }${genre ? `&with_genres=${genre}` : ""}${
    productionYear ? `&primary_release_year=${productionYear}` : ""
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
    const movies: Movies = await response.json();
    return movies;
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
