"use client";

import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import {
  fetchMoviesRankingData,
  fetchTvSeriesRankingData,
  setSortBy,
} from "@/store/rankingSlice";
import { useAppDispatch } from "@/store";
import RankingContentMovies from "./RankingMovies/RankingMovies";
import RankingContentTvSeries from "./RankingTvSeries/RankingTvSeries";
import styles from "./Rankings.module.scss";

const Rankings = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const dispatch = useAppDispatch();

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Movies",
      children: <RankingContentMovies />,
    },
    {
      key: "2",
      label: "TV series",
      children: <RankingContentTvSeries />,
    },
  ];

  const handleTabClick = async (key: string) => {
    setActiveTabKey(key);
    dispatch(setSortBy("vote_average.desc"));
    if (key === "1") {
      await dispatch(fetchMoviesRankingData({ sortBy: "vote_average.desc" }));
    } else if (key === "2") {
      await dispatch(fetchTvSeriesRankingData({ sortBy: "vote_average.desc" }));
    }
  };

  return (
    <section className={styles["ranking"]}>
      <Tabs
        items={tabs}
        defaultActiveKey="1"
        activeKey={activeTabKey}
        onTabClick={handleTabClick}
      />
    </section>
  );
};

export default Rankings;
