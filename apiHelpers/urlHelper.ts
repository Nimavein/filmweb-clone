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
  getFavoriteMovies: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${accountTMDBUrl}/${accountId}/favorite/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getFavoriteTvSeries: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${accountTMDBUrl}/${accountId}/favorite/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getWatchListMovies: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${accountTMDBUrl}/${accountId}/watchlist/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getWatchListTvSeries: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${accountTMDBUrl}/${accountId}/watchlist/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getRatedMovies: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${accountTMDBUrl}/${accountId}/rated/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getRatedTvSeries: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${accountTMDBUrl}/${accountId}/rated/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
};

const networkApi = {
  getNetworkImages: (networkId: number) =>
    `${networkTMDBUrl}${networkId}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};

const moviesApi = {
  getMoviesGenres: () => `${moviesGenresTMDBUrl}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};

const tvSeriesApi = {
  getTvSeriesGenres: () => `${tvGenresTMDBUrl}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};

export {
  profileApi,
  moviesApi,
  tvSeriesApi,
  networkApi,
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
