import {
  getFavoriteMovies,
  getRatedMovies,
  getWatchListMovies,
  getFavoriteTvSeries,
  getRatedTvSeries,
  getWatchListTvSeries,
} from "@/apiHelpers";
import { MediaType, ProfileContentType } from "@/types/types";

const getMediasFetchFunction = (
  mediaType: MediaType,
  contentType: ProfileContentType
) => {
  if (mediaType === "movie") {
    if (contentType === "favorites") {
      return getFavoriteMovies;
    } else if (contentType === "ratings") {
      return getRatedMovies;
    } else if (contentType === "watchList") {
      return getWatchListMovies;
    }
  } else if (mediaType === "tv") {
    if (contentType === "favorites") {
      return getFavoriteTvSeries;
    } else if (contentType === "ratings") {
      return getRatedTvSeries;
    } else if (contentType === "watchList") {
      return getWatchListTvSeries;
    }
  }
};

export default getMediasFetchFunction;
