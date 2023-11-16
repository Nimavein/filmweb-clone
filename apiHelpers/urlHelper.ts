const baseTMDBUrl = "https://api.themoviedb.org/3/";
const baseTMDBAccountUrl = `${baseTMDBUrl}account/`;

const profileApi = {
  getFavoriteMovies: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${baseTMDBAccountUrl}${accountId}/favorite/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getFavoriteTvSeries: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${baseTMDBAccountUrl}${accountId}/favorite/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getWatchListMovies: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${baseTMDBAccountUrl}${accountId}/watchlist/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getWatchListTvSeries: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${baseTMDBAccountUrl}${accountId}/watchlist/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getRatedMovies: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${baseTMDBAccountUrl}${accountId}/rated/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
  getRatedTvSeries: (accountId?: number, sessionId?: string) =>
    accountId && sessionId
      ? `${baseTMDBAccountUrl}${accountId}/rated/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      : null,
};

export { profileApi };
