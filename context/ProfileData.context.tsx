"use client";

import React, { ReactNode, createContext, useContext } from "react";
import { addMovieRating, addSeriesRating, deleteMovieRating, deleteSeriesRating } from "@/apiHelpers";
import { MediaType, Movies, RatedMovies, RatedTvSeries, TvSeries } from "@/types/types";
import { useAuthentication } from "./Authentication.context";
import useSWR from "swr";
import { profileApi } from "@/apiHelpers/urlHelper";
import { updateFavoriteMedia, updateWatchlistMedia } from "@/apiHelpers/profileApi";

interface ProfileDataType {
  favoriteMovies: Movies | undefined;
  favoriteTvSeries: TvSeries | undefined;
  watchListMovies: Movies | undefined;
  watchListTvSeries: TvSeries | undefined;
  ratedMovies: RatedMovies | undefined;
  ratedTvSeries: RatedTvSeries | undefined;
}

interface ProfileDataAmountType {
  favoriteMoviesAmount: number;
  favoriteTvSeriesAmount: number;
  watchListMoviesAmount: number;
  watchListTvSeriesAmount: number;
  ratedMoviesAmount: number;
  ratedTvSeriesAmount: number;
}

interface ProfileDataUpdatesType {
  updateRating: (mediaType: MediaType, mediaId: number, rating: number) => Promise<void>;
  deleteRating: (mediaType: MediaType, mediaId: number) => Promise<void>;
  getMediaRating: (mediaType: MediaType, mediaId: number) => number;
  updateFavorite: (mediaType: MediaType, mediaId: number, favorite: boolean) => Promise<void>;
  updateWatchlist: (mediaType: MediaType, mediaId: number, favorite: boolean) => Promise<void>;
  checkIfMediaIsFavorite: (mediaType: MediaType, mediaId: number) => boolean;
  checkIfMediaIsOnWatchlist: (mediaType: MediaType, mediaId: number) => boolean;
}

type ProfileDataContextType = ProfileDataType & ProfileDataAmountType & ProfileDataUpdatesType;

const ProfileDataContext = createContext<ProfileDataContextType>({
  favoriteMovies: undefined,
  favoriteTvSeries: undefined,
  watchListMovies: undefined,
  watchListTvSeries: undefined,
  ratedMovies: undefined,
  ratedTvSeries: undefined,
  favoriteMoviesAmount: 0,
  favoriteTvSeriesAmount: 0,
  watchListMoviesAmount: 0,
  watchListTvSeriesAmount: 0,
  ratedMoviesAmount: 0,
  ratedTvSeriesAmount: 0,
  updateRating: async () => {
    return Promise.resolve();
  },
  deleteRating: async () => {
    return Promise.resolve();
  },
  getMediaRating: () => 0,
  updateFavorite: async () => {
    return Promise.resolve();
  },
  updateWatchlist: async () => {
    return Promise.resolve();
  },
  checkIfMediaIsFavorite: () => false,
  checkIfMediaIsOnWatchlist: () => false,
});

export const useProfileData = () => {
  return useContext(ProfileDataContext);
};

export const ProfileDataProvider = ({ children }: { children: ReactNode }) => {
  const { accountId, sessionId } = useAuthentication();

  const { data: favoriteMovies, mutate: mutateFavoriteMovies } = useSWR<Movies>(
    accountId && sessionId ? profileApi.getFavoriteMovies(accountId, sessionId) : null
  );
  const { data: favoriteTvSeries, mutate: mutateFavoriteTvSeries } = useSWR<TvSeries>(
    accountId && sessionId ? profileApi.getFavoriteTvSeries(accountId, sessionId) : null
  );
  const { data: watchListMovies, mutate: mutateWatchListMovies } = useSWR<Movies>(
    accountId && sessionId ? profileApi.getWatchListMovies(accountId, sessionId) : null
  );
  const { data: watchListTvSeries, mutate: mutateWatchListTvSeries } = useSWR<TvSeries>(
    accountId && sessionId ? profileApi.getWatchListTvSeries(accountId, sessionId) : null
  );
  const { data: ratedMovies, mutate: mutateRatedMovies } = useSWR<RatedMovies>(
    accountId && sessionId ? profileApi.getRatedMovies(accountId, sessionId) : null
  );
  const { data: ratedTvSeries, mutate: mutateRatedTvSeries } = useSWR<RatedTvSeries>(
    accountId && sessionId ? profileApi.getRatedTvSeries(accountId, sessionId) : null
  );

  const favoriteMoviesAmount = favoriteMovies?.total_results || 0;
  const favoriteTvSeriesAmount = favoriteTvSeries?.total_results || 0;
  const watchListMoviesAmount = watchListMovies?.total_results || 0;
  const watchListTvSeriesAmount = watchListTvSeries?.total_results || 0;
  const ratedMoviesAmount = ratedMovies?.total_results || 0;
  const ratedTvSeriesAmount = ratedTvSeries?.total_results || 0;

  const updateRating = async (mediaType: MediaType, mediaId: number, rating: number) => {
    if (sessionId && accountId) {
      const updateFunction = mediaType === "movie" ? addMovieRating : addSeriesRating;
      await updateFunction(mediaId, sessionId, rating);
      // weird bug, looks like mutation is invoked before changes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await (mediaType === "movie" ? mutateRatedMovies() : mutateRatedTvSeries());
    }
  };

  const updateFavorite = async (mediaType: MediaType, mediaId: number, favorite: boolean) => {
    if (sessionId && accountId) {
      await updateFavoriteMedia(accountId, sessionId, mediaType, mediaId, favorite);
      await (mediaType === "movie" ? mutateFavoriteMovies() : mutateFavoriteTvSeries());
    }
  };

  const updateWatchlist = async (mediaType: MediaType, mediaId: number, watchlist: boolean) => {
    if (sessionId && accountId) {
      await updateWatchlistMedia(accountId, sessionId, mediaType, mediaId, watchlist);
      await (mediaType === "movie" ? mutateWatchListMovies() : mutateWatchListTvSeries());
    }
  };

  const deleteRating = async (mediaType: MediaType, mediaId: number) => {
    if (sessionId && accountId) {
      const deleteFunction = mediaType === "movie" ? deleteMovieRating : deleteSeriesRating;
      await deleteFunction(mediaId, sessionId);
      // weird bug, looks like mutation is invoked before changes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await (mediaType === "movie" ? mutateRatedMovies() : mutateRatedTvSeries());
    }
  };

  const getMediaRating = (mediaType: MediaType, mediaId: number): number => {
    const media = mediaType === "movie" ? ratedMovies : ratedTvSeries;
    const item = media?.results?.find((item) => item.id === mediaId);
    return item?.rating || 0;
  };

  const checkIfMediaIsFavorite = (mediaType: MediaType, mediaId: number): boolean => {
    const media = mediaType === "movie" ? favoriteMovies : favoriteTvSeries;
    const isFavorite = media?.results?.some((item) => item.id === mediaId) || false;
    return isFavorite;
  };

  const checkIfMediaIsOnWatchlist = (mediaType: MediaType, mediaId: number): boolean => {
    const media = mediaType === "movie" ? watchListMovies : watchListTvSeries;
    const isOnWatchlist = media?.results?.some((item) => item.id === mediaId) || false;
    return isOnWatchlist;
  };

  const contextValue = {
    favoriteMovies,
    favoriteTvSeries,
    watchListMovies,
    watchListTvSeries,
    ratedMovies,
    ratedTvSeries,
    favoriteMoviesAmount,
    favoriteTvSeriesAmount,
    watchListMoviesAmount,
    watchListTvSeriesAmount,
    ratedMoviesAmount,
    ratedTvSeriesAmount,
    updateRating,
    deleteRating,
    getMediaRating,
    updateFavorite,
    updateWatchlist,
    checkIfMediaIsFavorite,
    checkIfMediaIsOnWatchlist,
  };

  return <ProfileDataContext.Provider value={contextValue}>{children}</ProfileDataContext.Provider>;
};
