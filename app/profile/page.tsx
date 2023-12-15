import React from "react";
import styles from "./Profile.module.scss";
import ProfileTabs from "./components/ProfileTabs/ProfileTabs";
import { getAuthenticationCookies } from "@/helpers/cookiesHelpers";
import {
  getFavoriteMovies,
  getFavoriteTvSeries,
  getRatedMovies,
  getRatedTvSeries,
  getWatchListMovies,
  getWatchListTvSeries,
} from "@/apiHelpers";

const Profile = async () => {
  const { sessionId, accountId } = getAuthenticationCookies();
  const [
    favoriteMovies,
    favoriteTvSeries,
    watchListMovies,
    watchListTvSeries,
    ratedMovies,
    ratedTvSeries,
  ] = await Promise.all([
    getFavoriteMovies(accountId, sessionId),
    getFavoriteTvSeries(accountId, sessionId),
    getWatchListMovies(accountId, sessionId),
    getWatchListTvSeries(accountId, sessionId),
    getRatedMovies(accountId, sessionId),
    getRatedTvSeries(accountId, sessionId),
  ]);

  return (
    <main className={styles["profile"]}>
      <ProfileTabs
        favoriteMovies={favoriteMovies}
        favoriteTvSeries={favoriteTvSeries}
        watchListMovies={watchListMovies}
        watchListTvSeries={watchListTvSeries}
        ratedMovies={ratedMovies}
        ratedTvSeries={ratedTvSeries}
      />
    </main>
  );
};

export default Profile;
