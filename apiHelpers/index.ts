import {
  getMovieData,
  getMovieCollection,
  getMovieReviews,
  addMovieRating,
  deleteMovieRating,
} from "./movieApi";
import {
  getPopularMovies,
  getMoviesData,
  getUpcomingMovies,
} from "./moviesApi";
import { getPersonData } from "./personApi";
import { getPopularPeople } from "./peopleApi";
import {
  getSeriesData,
  getSeriesReviews,
  getSeriesSeasonData,
  deleteSeriesRating,
  addSeriesRating,
} from "./seriesApi";
import {
  getWatchProviderTvSeries,
  getUpcomingTvSeries,
  getTvSeriesData,
} from "./tvSeriesApi";
import { getNews } from "./newsApi";
import {
  getRequestToken,
  deleteSession,
  createNewSession,
  getAccountData,
} from "./authenticationApi";
import {
  getFavoriteMovies,
  getFavoriteTvSeries,
  getWatchListMovies,
  getWatchListTvSeries,
  getRatedMovies,
  getRatedTvSeries,
} from "./profileApi";
import { getNetworkImages } from "./networksApi";

export {
  getMoviesData,
  getTvSeriesData,
  getMovieData,
  getMovieCollection,
  getMovieReviews,
  getPopularMovies,
  getPopularPeople,
  getPersonData,
  getSeriesData,
  getSeriesReviews,
  getSeriesSeasonData,
  getWatchProviderTvSeries,
  getNews,
  getRequestToken,
  deleteSession,
  createNewSession,
  getAccountData,
  getFavoriteMovies,
  getFavoriteTvSeries,
  getWatchListMovies,
  getWatchListTvSeries,
  getRatedMovies,
  getRatedTvSeries,
  addMovieRating,
  deleteMovieRating,
  deleteSeriesRating,
  addSeriesRating,
  getNetworkImages,
  getUpcomingMovies,
  getUpcomingTvSeries,
};
