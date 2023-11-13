import React from "react";
import { ActiveRankingFilters, PageRankingParams } from "@/types/types";
import {
  getMoviesGenres,
  getMoviesRankingData,
  getTvSeriesGenres,
  getTvSeriesRankingData,
} from "@/api";
import RankingMovies from "./components/RankingMovies/RankingMovies";
import RankingTvSeries from "./components/RankingTvSeries/RankingTvSeries";
import Tabs from "@/components/Tabs/Tabs";

import styles from "./Rankings.module.scss";

const Rankings = async ({
  searchParams: { sortBy, productionYear, genre, originalLanguage },
}: PageRankingParams) => {
  const activeFilters: ActiveRankingFilters = {
    productionYear,
    genre,
    originalLanguage,
  };
  const movies = await getMoviesRankingData(sortBy, activeFilters);
  const tvSeries = await getTvSeriesRankingData(sortBy, activeFilters);
  const moviesGenres = await getMoviesGenres();
  const tvSeriesGenres = await getTvSeriesGenres();

  const tabs = [
    {
      key: "1",
      label: "Movies",
      children: (
        <RankingMovies
          sortBy={sortBy}
          movies={movies}
          activeFilters={activeFilters}
          genres={moviesGenres || []}
        />
      ),
    },
    {
      key: "2",
      label: "TV series",
      children: (
        <RankingTvSeries
          sortBy={sortBy}
          tvSeries={tvSeries}
          activeFilters={activeFilters}
          genres={tvSeriesGenres || []}
        />
      ),
    },
  ];
  return (
    <main className={styles["ranking"]}>
      <Tabs items={tabs} defaultActiveKey="1" />
    </main>
  );
};

export default Rankings;
