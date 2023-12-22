"use client";

import React from "react";
import RankingMovies from "./components/RankingMovies/RankingMovies";
import RankingTvSeries from "./components/RankingTvSeries/RankingTvSeries";
import Tabs from "@/components/Tabs/Tabs";

import styles from "./Rankings.module.scss";
import { getMoviesData, getTvSeriesData } from "@/apiHelpers";
import useInfiniteContent from "@/hooks/useInfiniteContent";
import { Movie, Series } from "@/types/types";

const Rankings = () => {
  const fetchTvSeriesData = async (pageNumber: number): Promise<Series[]> => {
    const tvSeriesData = await getTvSeriesData(
      undefined,
      undefined,
      undefined,
      pageNumber
    );
    return tvSeriesData.results;
  };

  const fetchMoviesData = async (pageNumber: number): Promise<Movie[]> => {
    const moviesData = await getMoviesData(
      undefined,
      undefined,
      undefined,
      pageNumber
    );
    return moviesData.results;
  };

  const { content: tvSeries, fetchMoreData: fetchTvSeries } =
    useInfiniteContent({
      fetchFunction: fetchTvSeriesData,
    });

  const { content: movies, fetchMoreData: fetchMovies } = useInfiniteContent({
    fetchFunction: fetchMoviesData,
  });

  const tabs = [
    {
      key: "movies",
      label: "Movies",
      children: <RankingMovies movies={movies} fetchMoviesData={fetchMovies} />,
    },
    {
      key: "tv-series",
      label: "TV series",
      children: (
        <RankingTvSeries
          tvSeries={tvSeries}
          fetchTvSeriesData={fetchTvSeries}
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
