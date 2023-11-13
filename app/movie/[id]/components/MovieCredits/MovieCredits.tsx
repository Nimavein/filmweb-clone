"use client";

import React from "react";
import styles from "./MovieCredits.module.scss";
import sectionStyles from "../../Movie.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { Tabs, TabsProps } from "antd";
import MovieContentCreditsCarousel from "./MovieCreditsCarousel/MovieCreditsCarousel";
import { MovieDetails } from "@/types/types";

interface MovieCreditsProps {
  movieDetails: MovieDetails;
}

const MovieCredits = ({
  movieDetails: { credits, title, id },
}: MovieCreditsProps) => {
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: `CAST (${credits?.cast?.length})`,
      children: <MovieContentCreditsCarousel cast={credits?.cast} />,
    },
    {
      key: "2",
      label: `CREW (${credits?.crew?.length})`,
      children: <MovieContentCreditsCarousel crew={credits?.crew} />,
    },
  ];

  const creditsSectionHeader = `Credits of the movie ${title}`.toUpperCase();
  return (
    <section
      className={`${styles["movie-credits"]} ${sectionStyles["movie-section"]}`}
      aria-labelledby="movie-credits"
    >
      <h2
        id="movie-credits"
        className={`${styles["movie-credits__header"]} ${sectionStyles["movie-section__header"]}`}
      >
        {creditsSectionHeader}
      </h2>
      <Tabs items={tabs} defaultActiveKey={"1"} />
      <Link href={`/movie/${id}/credits`}>
        <Button>See all credits</Button>
      </Link>
    </section>
  );
};

export default MovieCredits;
