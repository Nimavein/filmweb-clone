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
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Entertainment Profile: Watchlist, Ratings, and Favorites",
  description:
    "Explore your personalized entertainment profile. View your watchlist, check your ratings, and discover your favorite movies and TV series. Manage your preferences and keep track of your cinematic journey.",
};

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
