/* eslint-disable @typescript-eslint/no-explicit-any */

import { GenresDTO, Movies } from "@/types/types";

export const getPopularMovies = async (page: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
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
      `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    const movies: Movies = await response.json();
    return movies;
  } catch (error: any) {
    console.error(error);
  }
};

export const getMoviesGenres = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MOVIE_GENRES_API_URL}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await response.json();
    const genres: GenresDTO = data.genres;
    return genres;
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
      `${process.env.NEXT_PUBLIC_BASE_API_URL}discover/movie?api_key=${
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
