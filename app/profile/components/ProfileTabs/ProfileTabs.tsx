"use client";

import React from "react";
import Tabs, { TabsProps } from "@/components/Tabs/Tabs";
import ProfileTab from "./ProfileTab/ProfileTab";
import { Movies, TvSeries, RatedMovies, RatedTvSeries } from "@/types/types";

interface ProfileTabsProps {
  favoriteMovies: Movies | undefined;
  favoriteTvSeries: TvSeries | undefined;
  watchListMovies: Movies | undefined;
  watchListTvSeries: TvSeries | undefined;
  ratedMovies: RatedMovies | undefined;
  ratedTvSeries: RatedTvSeries | undefined;
}

const ProfileTabs = ({
  favoriteMovies,
  favoriteTvSeries,
  watchListMovies,
  watchListTvSeries,
  ratedMovies,
  ratedTvSeries,
}: ProfileTabsProps) => {
  const favoriteMoviesAmount = favoriteMovies?.total_results || 0;
  const favoriteTvSeriesAmount = favoriteTvSeries?.total_results || 0;
  const watchListMoviesAmount = watchListMovies?.total_results || 0;
  const watchListTvSeriesAmount = watchListTvSeries?.total_results || 0;
  const ratedMoviesAmount = ratedMovies?.total_results || 0;
  const ratedTvSeriesAmount = ratedTvSeries?.total_results || 0;

  const tabs: TabsProps["items"] = [
    {
      key: "favorite",
      label: `Favorites (${favoriteMoviesAmount + favoriteTvSeriesAmount})`,
      children: (
        <ProfileTab movies={favoriteMovies} tvSeries={favoriteTvSeries} />
      ),
      disabled: favoriteMoviesAmount === 0 && favoriteTvSeriesAmount === 0,
    },
    {
      key: "rating",
      label: `Ratings (${ratedMoviesAmount + ratedTvSeriesAmount})`,
      children: <ProfileTab movies={ratedMovies} tvSeries={ratedTvSeries} />,
      disabled: ratedMoviesAmount === 0 && ratedTvSeriesAmount === 0,
    },
    {
      key: "watch-list",
      label: `Watch list (${watchListTvSeriesAmount + watchListMoviesAmount})`,
      children: (
        <ProfileTab movies={watchListMovies} tvSeries={watchListTvSeries} />
      ),
      disabled: watchListTvSeriesAmount === 0 && watchListMoviesAmount === 0,
    },
  ];
  return (
    <section>
      <Tabs items={tabs} defaultActiveKey="favorite" paramKey="content" />
    </section>
  );
};

export default ProfileTabs;
