import React from "react";
import { ActiveRankingFilters, PageRankingParams } from "@/types/types";
import {
  getMoviesGenres,
  getMoviesRankingData,
  getTvSeriesGenres,
  getTvSeriesRankingData,
} from "@/apiHelpers";
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
      key: "movies",
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
      key: "tv-series",
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
      <Tabs items={tabs} defaultActiveKey="movies" paramKey="rankingContent" />
    </main>
  );
};

export default Rankings;
