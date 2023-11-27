import React from "react";
import { PageRankingParams } from "@/types/types";
import RankingMovies from "./components/RankingMovies/RankingMovies";
import RankingTvSeries from "./components/RankingTvSeries/RankingTvSeries";
import Tabs from "@/components/Tabs/Tabs";
import { getMoviesData, getTvSeriesData } from "@/apiHelpers";

import styles from "./Rankings.module.scss";

const Rankings = async ({ searchParams: { sortBy } }: PageRankingParams) => {
  const movies = await getMoviesData(sortBy);
  const tvSeries = await getTvSeriesData(sortBy);

  const tabs = [
    {
      key: "movies",
      label: "Movies",
      children: <RankingMovies sortBy={sortBy} movies={movies} />,
    },
    {
      key: "tv-series",
      label: "TV series",
      children: <RankingTvSeries sortBy={sortBy} tvSeries={tvSeries} />,
    },
  ];
  return (
    <main className={styles["ranking"]}>
      <Tabs items={tabs} defaultActiveKey="movies" paramKey="rankingContent" />
    </main>
  );
};

export default Rankings;
