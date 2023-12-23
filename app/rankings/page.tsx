"use client";

import React from "react";
import Tabs from "@/components/Tabs/Tabs";
import { getMoviesData, getTvSeriesData } from "@/apiHelpers";
import useInfiniteContent from "@/hooks/useInfiniteContent";
import { ActiveMediaFiltersType, Movie, Series } from "@/types/types";
import RankingMedias from "./components/RankingMedias/RankingMedias";

import styles from "./Rankings.module.scss";

const fetchData = async <T,>(
  getData: (
    sortBy?: string,
    filters?: ActiveMediaFiltersType,
    minVoteCount?: string,
    pageNumber?: number
  ) => Promise<{ results: T[] }>,
  pageNumber: number
): Promise<T[]> => {
  const data = await getData(undefined, undefined, undefined, pageNumber);
  return data.results;
};

const Rankings = () => {
  const { content: tvSeries, fetchMoreData: fetchTvSeries } =
    useInfiniteContent((pageNumber: number) =>
      fetchData<Series>(getTvSeriesData, pageNumber)
    );

  const { content: movies, fetchMoreData: fetchMovies } = useInfiniteContent(
    (pageNumber: number) => fetchData<Movie>(getMoviesData, pageNumber)
  );

  const tabs = [
    {
      key: "movies",
      label: "Movies",
      children: (
        <RankingMedias
          medias={movies}
          fetchMediaData={fetchMovies}
          mediaType="movie"
        />
      ),
    },
    {
      key: "tv-series",
      label: "TV series",
      children: (
        <RankingMedias
          medias={tvSeries}
          fetchMediaData={fetchTvSeries}
          mediaType="tv"
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
