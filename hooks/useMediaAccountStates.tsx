import {
  addMovieRating,
  addSeriesRating,
  deleteMovieRating,
  deleteSeriesRating,
} from "@/apiHelpers";
import {
  updateFavoriteMedia,
  updateWatchlistMedia,
} from "@/apiHelpers/profileApi";
import { profileApi } from "@/apiHelpers/urlHelper";
import { useAuthentication } from "@/context/Authentication.context";
import { MediaAccountStates, MediaType } from "@/types/types";
import useSWR, { mutate } from "swr";

const useMediaAccountStates = (mediaType: MediaType, mediaId: number) => {
  const { accountData, sessionId } = useAuthentication();
  const accountId = accountData?.id;
  const { data: mediaAccountStates, mutate: mutateMediaAccountStates } =
    useSWR<MediaAccountStates>(
      sessionId
        ? mediaType === "movie"
          ? profileApi.getMovieAccountStates(mediaId, sessionId)
          : profileApi.getSeriesAccountStates(mediaId, sessionId)
        : null
    );

  const { rated, favorite, watchlist } = mediaAccountStates || {};

  const updateRating = async (rating: number) => {
    if (sessionId && accountId) {
      const updateFunction =
        mediaType === "movie" ? addMovieRating : addSeriesRating;
      await updateFunction(mediaId, sessionId, rating);
      // weird bug, looks like mutation is invoked before changes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await mutateMediaAccountStates();
      mutate(
        mediaType === "movie"
          ? profileApi.getRatedMovies
          : profileApi.getRatedTvSeries
      );
    }
  };

  const updateFavorite = async (favorite: boolean) => {
    if (sessionId && accountId) {
      await updateFavoriteMedia(
        accountId,
        sessionId,
        mediaType,
        mediaId,
        favorite
      );
      await mutateMediaAccountStates();
      mutate(
        mediaType === "movie"
          ? profileApi.getFavoriteMovies
          : profileApi.getFavoriteTvSeries
      );
    }
  };

  const updateWatchlist = async (watchlist: boolean) => {
    if (sessionId && accountId) {
      await updateWatchlistMedia(
        accountId,
        sessionId,
        mediaType,
        mediaId,
        watchlist
      );
      await mutateMediaAccountStates();
      mutate(
        mediaType === "movie"
          ? profileApi.getWatchListMovies
          : profileApi.getWatchListTvSeries
      );
    }
  };

  const deleteRating = async () => {
    if (sessionId && accountId) {
      const deleteFunction =
        mediaType === "movie" ? deleteMovieRating : deleteSeriesRating;
      await deleteFunction(mediaId, sessionId);
      // weird bug, looks like mutation is invoked before changes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await mutateMediaAccountStates();
      mutate(
        mediaType === "movie"
          ? profileApi.getRatedMovies
          : profileApi.getRatedTvSeries
      );
    }
  };

  return {
    updateRating,
    updateFavorite,
    updateWatchlist,
    deleteRating,
    rating: typeof rated === "object" ? rated.value : 0,
    favorite,
    watchlist,
  };
};

export default useMediaAccountStates;
