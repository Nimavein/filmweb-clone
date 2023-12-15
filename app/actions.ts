"use server";

import {
  favoriteMoviesTag,
  favoriteTvSeriesTag,
  ratedMoviesTag,
  ratedTvSeriesTag,
  watchlistMoviesTag,
  watchlistTvSeriesTag,
} from "@/apiHelpers/profileApi";
import { MediaType } from "@/types/types";
import { revalidateTag } from "next/cache";

async function revalidateRatedMedia(mediaType: MediaType) {
  revalidateTag(mediaType === "movie" ? ratedMoviesTag : ratedTvSeriesTag);
}

async function revalidateFavoriteMedia(mediaType: MediaType) {
  revalidateTag(
    mediaType === "movie" ? favoriteMoviesTag : favoriteTvSeriesTag
  );
}

async function revalidateWatchlistMedia(mediaType: MediaType) {
  revalidateTag(
    mediaType === "movie" ? watchlistMoviesTag : watchlistTvSeriesTag
  );
}

export {
  revalidateRatedMedia,
  revalidateFavoriteMedia,
  revalidateWatchlistMedia,
};
