import { getMovieData, getMovieCollection, getMovieReviews } from "./movieApi";
import {
  getPopularMovies,
  getWatchProviderMovies,
  getMoviesGenres,
} from "./moviesApi";
import { getPersonData } from "./personApi";
import { getPopularPeople } from "./peopleApi";
import {
  getSeriesData,
  getSeriesReviews,
  getSeriesSeasonData,
} from "./seriesApi";
import {
  getPopularTvSeries,
  getWatchProviderTvSeries,
  getTvSeriesGenres,
} from "./tvSeriesApi";
import { getTvSeriesRankingData, getMoviesRankingData } from "./rankingApi";
import { getNews } from "./newsApi";

export {
  getMovieData,
  getMovieCollection,
  getMovieReviews,
  getPopularMovies,
  getPopularPeople,
  getWatchProviderMovies,
  getPersonData,
  getSeriesData,
  getSeriesReviews,
  getSeriesSeasonData,
  getPopularTvSeries,
  getWatchProviderTvSeries,
  getTvSeriesRankingData,
  getMoviesRankingData,
  getMoviesGenres,
  getTvSeriesGenres,
  getNews,
};
