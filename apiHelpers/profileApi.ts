/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  MediaAccountStates,
  MediaType,
  Movies,
  RatedMovies,
  RatedTvSeries,
  TvSeries,
} from "@/types/types";
import { accountTMDBUrl, profileApi } from "./urlHelper";

export const getFavoriteMovies = async (
  accountId: number,
  sessionId: string,
  page = 1
) => {
  try {
    const response = await fetch(
      profileApi.getFavoriteMovies(accountId, sessionId, page)
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
      profileApi.getFavoriteTvSeries(accountId, sessionId, page)
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
      profileApi.getRatedMovies(accountId, sessionId, page)
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
      profileApi.getRatedTvSeries(accountId, sessionId, page)
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
      profileApi.getWatchListMovies(accountId, sessionId, page)
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
      profileApi.getWatchListTvSeries(accountId, sessionId, page)
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
      `${accountTMDBUrl}/${accountId}/favorite?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
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
      `${accountTMDBUrl}/${accountId}/watchlist?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
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

export const getMovieAccountStates = async (
  movieId: number,
  sessionId: string
) => {
  try {
    const response = await fetch(
      profileApi.getMovieAccountStates(movieId, sessionId)
    );
    const accountStates: MediaAccountStates = await response.json();
    return accountStates;
  } catch (error: any) {
    console.error(error);
  }
};

export const getSeriesAccountStates = async (
  seriesId: number,
  sessionId: string
) => {
  try {
    const response = await fetch(
      profileApi.getSeriesAccountStates(seriesId, sessionId)
    );
    const accountStates: MediaAccountStates = await response.json();
    return accountStates;
  } catch (error: any) {
    console.error(error);
  }
};
