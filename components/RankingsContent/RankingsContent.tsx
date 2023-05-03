import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { fetchMoviesRankingData, fetchTvSeriesRankingData, setSortBy } from "@/store/rankingSlice";
import { useAppDispatch } from "@/store";
import RankingContentMovies from "./RankingContentMovies/RankingContentMovies";
import RankingContentTvSeries from "./RankingContentTvSeries/RankingContentTvSeries";
import styles from "./RankingsContent.module.scss";

const RankingsContent = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const router = useRouter();
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
    dispatch(setSortBy("vote_average.desc"))
    if (key === "1") {
      await dispatch(fetchMoviesRankingData("vote_average.desc"));
    } else if (key === "2") {
      await dispatch(fetchTvSeriesRankingData("vote_average.desc"));
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

export default RankingsContent;
