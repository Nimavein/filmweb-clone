import { ActiveMediaFiltersType } from "@/types/types";

const baseTMDBUrl = "https://api.themoviedb.org/3/";

const createTMDBUrl = (path: string) => `${baseTMDBUrl}${path}`;

const accountTMDBUrl = createTMDBUrl("account");
const networkTMDBUrl = createTMDBUrl("network/");
const movieTMDBUrl = createTMDBUrl("movie/");
const discoverTMDBUrl = createTMDBUrl("discover/");
const personTMDBUrl = createTMDBUrl("person/");
const seriesTMDBUrl = createTMDBUrl("tv/");
const collectionTMDBUrl = createTMDBUrl("collection/");
const watchProvidersTMDBUrl = createTMDBUrl("watch/providers/");
const searchTMDBUrl = createTMDBUrl("search/");
const moviesGenresTMDBUrl = createTMDBUrl("genre/movie/list");
const tvGenresTMDBUrl = createTMDBUrl("genre/tv/list");
const authenticationTMDBUrl = createTMDBUrl("authentication/");
const newsTMDBUrl = "https://flixster.p.rapidapi.com/news/list";

const profileApi = {
  getFavoriteMovies: (accountId?: number, sessionId?: string, page = 1) =>
    `${accountTMDBUrl}/${accountId}/favorite/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`,
  getFavoriteTvSeries: (accountId?: number, sessionId?: string, page = 1) =>
    `${accountTMDBUrl}/${accountId}/favorite/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`,
  getWatchListMovies: (accountId?: number, sessionId?: string, page = 1) =>
    `${accountTMDBUrl}/${accountId}/watchlist/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`,
  getWatchListTvSeries: (accountId?: number, sessionId?: string, page = 1) =>
    `${accountTMDBUrl}/${accountId}/watchlist/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`,
  getRatedMovies: (accountId?: number, sessionId?: string, page = 1) =>
    `${accountTMDBUrl}/${accountId}/rated/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`,
  getRatedTvSeries: (accountId?: number, sessionId?: string, page = 1) =>
    `${accountTMDBUrl}/${accountId}/rated/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&page=${page}`,
  getMovieAccountStates: (movieId?: number, sessionId?: string) =>
    `${baseTMDBUrl}/movie/${movieId}/account_states?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
  getSeriesAccountStates: (seriesId?: number, sessionId?: string) =>
    `${baseTMDBUrl}/tv/${seriesId}/account_states?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
};

const networkApi = {
  getNetworkImages: (networkId: number) =>
    `${networkTMDBUrl}${networkId}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};

const moviesApi = {
  getMoviesGenres: () =>
    `${moviesGenresTMDBUrl}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  getMoviesData: (
    sortBy = "vote_average.desc",
    filters?: ActiveMediaFiltersType,
    minVoteCount = "500",
    page = 1
  ) => {
    const { originalLanguage, genre, productionYear, providers } =
      filters || {};
    const params = new URLSearchParams({
      api_key: process.env.NEXT_PUBLIC_API_KEY || "",
      sort_by: sortBy,
      "vote_count.gte": minVoteCount,
      with_original_language: originalLanguage?.join("|") || "",
      with_genres: genre?.join("|") || "",
      primary_release_year: productionYear?.join("|") || "",
      with_watch_providers: providers?.join("|") || "",
      watch_region: providers !== null ? "PL" : "",
      page: page.toString(),
    } as Record<string, string>);

    return `${discoverTMDBUrl}movie?${params.toString()}`;
  },
};

const tvSeriesApi = {
  getTvSeriesGenres: () =>
    `${tvGenresTMDBUrl}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  getTvSeriesData: (
    sortBy = "vote_average.desc",
    filters?: ActiveMediaFiltersType,
    minVoteCount = "500",
    page = 1
  ) => {
    const { originalLanguage, genre, productionYear, providers } =
      filters || {};
    const params = new URLSearchParams({
      api_key: process.env.NEXT_PUBLIC_API_KEY || "",
      sort_by: sortBy,
      "vote_count.gte": minVoteCount,
      with_original_language: originalLanguage?.join("|") || "",
      with_genres: genre?.join("|") || "",
      first_air_date_year: productionYear?.join("|") || "",
      with_watch_providers: providers?.join("|") || "",
      watch_region: providers !== null ? "PL" : "",
      page: page.toString(),
    } as Record<string, string>);

    return `${discoverTMDBUrl}tv?${params.toString()}`;
  },
};

const watchProvidersApi = {
  getMoviesWatchProviders: () =>
    `${watchProvidersTMDBUrl}movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&watch_region=PL`,
  getTvSeriesWatchProviders: () =>
    `${watchProvidersTMDBUrl}tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&watch_region=PL`,
};

export {
  profileApi,
  moviesApi,
  tvSeriesApi,
  networkApi,
  watchProvidersApi,
  accountTMDBUrl,
  movieTMDBUrl,
  discoverTMDBUrl,
  personTMDBUrl,
  seriesTMDBUrl,
  collectionTMDBUrl,
  watchProvidersTMDBUrl,
  searchTMDBUrl,
  moviesGenresTMDBUrl,
  tvGenresTMDBUrl,
  authenticationTMDBUrl,
  newsTMDBUrl,
};
