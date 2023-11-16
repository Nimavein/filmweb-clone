/* eslint-disable @typescript-eslint/no-explicit-any */

import { MediaType, Movies, RatedMovies, RatedTvSeries, TvSeries } from "@/types/types";

const baseUrl = "https://api.themoviedb.org/3/account/";

export const getFavoriteMovies = async (
  accountId: number,
  sessionId: string,
  page = 1
) => {
  try {
    const response = await fetch(
      `${baseUrl}${accountId}/favorite/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`
    );
    const movies: Movies = await response.json();
    return movies;
  } catch (error: any) {
    console.error(error);
  }
};

export const getFavoriteTvSeries = async (
  accountId: number,
  sessionId: string,
  page = 1
) => {
  try {
    const response = await fetch(
      `${baseUrl}${accountId}/favorite/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`
    );
    const tvSeries: TvSeries = await response.json();
    return tvSeries;
  } catch (error: any) {
    console.error(error);
  }
};

export const getRatedMovies = async (
  accountId: number,
  sessionId: string,
  page = 1
) => {
  try {
    const response = await fetch(
      `${baseUrl}${accountId}/rated/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`
    );
    const movies: RatedMovies = await response.json();
    return movies;
  } catch (error: any) {
    console.error(error);
  }
};

export const getRatedTvSeries = async (
  accountId: number,
  sessionId: string,
  page = 1
) => {
  try {
    const response = await fetch(
      `${baseUrl}${accountId}/rated/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`
    );
    const tvSeries: RatedTvSeries = await response.json();
    return tvSeries;
  } catch (error: any) {
    console.error(error);
  }
};

export const getWatchListMovies = async (
  accountId: number,
  sessionId: string,
  page = 1
) => {
  try {
    const response = await fetch(
      `${baseUrl}${accountId}/watchlist/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`
    );
    const movies: Movies = await response.json();
    return movies;
  } catch (error: any) {
    console.error(error);
  }
};

export const getWatchListTvSeries = async (
  accountId: number,
  sessionId: string,
  page = 1
) => {
  try {
    const response = await fetch(
      `${baseUrl}${accountId}/watchlist/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`
    );
    const tvSeries: TvSeries = await response.json();
    return tvSeries;
  } catch (error: any) {
    console.error(error);
  }
};

export const updateFavoriteMedia = async (
  accountId: number,
  sessionId: string,
  mediaType: MediaType,
  mediaId: number,
  favorite: boolean
) => {
  try {
    await fetch(
      `${baseUrl}${accountId}/favorite?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: mediaType,
          media_id: mediaId,
          favorite,
        }),
      }
    );
  } catch (error: any) {
    console.error(error);
  }
};

export const updateWatchlistMedia = async (
  accountId: number,
  sessionId: string,
  mediaType: MediaType,
  mediaId: number,
  watchlist: boolean
) => {
  try {
    await fetch(
      `${baseUrl}${accountId}/watchlist?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: mediaType,
          media_id: mediaId,
          watchlist,
        }),
      }
    );
  } catch (error: any) {
    console.error(error);
  }
};
