"use client";

import React from "react";
import Tabs, { TabsProps } from "@/components/Tabs/Tabs";
import ProfileTab from "./ProfileTab/ProfileTab";
import { useProfileData } from "@/context/ProfileData.context";

const ProfileTabs = () => {
  const {
    favoriteMovies,
    favoriteMoviesAmount,
    favoriteTvSeries,
    favoriteTvSeriesAmount,
    ratedMoviesAmount,
    ratedTvSeriesAmount,
    watchListMoviesAmount,
    watchListTvSeriesAmount,
    watchListMovies,
    watchListTvSeries,
    ratedMovies,
    ratedTvSeries,
  } = useProfileData();
  
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
