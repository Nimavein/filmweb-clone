import { getNews, getUpcomingMovies, getUpcomingTvSeries } from "@/apiHelpers";
import MediaCarousel from "@/components/MediaCarousel/MediaCarousel";
import News from "@/components/News/News";
import React from "react";
import type { Metadata } from "next";

import styles from "./Home.module.scss";

export const metadata: Metadata = {
  title: "WhatToWatch - Discover Your Favorites",
  description:
    "Explore a vast collection of movies, TV series, and celebrity profiles. Stay updated with upcoming releases, get insights into the latest news, and dive into the world of entertainment.",
};

const baseCSSClassName = "home";

const Home = async () => {
  const [news, upcomingMovies, upcomingTvSeries] = await Promise.all([
    getNews(),
    getUpcomingMovies(),
    getUpcomingTvSeries(),
  ]);

  return (
    <main className={styles[baseCSSClassName]}>
      {news && <News news={news} />}
      <section className={styles[`${baseCSSClassName}__upcoming`]}>
        {upcomingMovies && (
          <MediaCarousel
            title="UPCOMING MOVIES"
            medias={upcomingMovies}
            mediaType="movie"
            slidesToShow={5}
          />
        )}
        {upcomingTvSeries && (
          <MediaCarousel
            title="UPCOMING TV SERIES"
            medias={upcomingTvSeries}
            mediaType="tv"
            slidesToShow={5}
          />
        )}
      </section>
    </main>
  );
};

export default Home;
