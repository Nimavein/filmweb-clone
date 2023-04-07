import React from "react";
import { useAppSelector } from "@/store";
import styles from "./MovieContentCredits.module.scss";
import sectionStyles from "../MovieContent.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { Tabs, TabsProps } from "antd";
import MovieContentCreditsCarousel from "./MovieContentCreditsCarousel/MovieContentCreditsCarousel";

const MovieContentCredits = () => {
  const { credits, movieDetails } = useAppSelector((state) => state.movie);

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

  const creditsSectionHeader =
    `Credits of the movie ${movieDetails?.title}`.toUpperCase();
  return (
    <section
      className={`${styles["movie-content__credits"]} ${sectionStyles["movie-content__section"]}`}
      aria-labelledby="movie-content-credits"
    >
      <h2
        id="movie-content-cast"
        className={`${styles["movie-content__images-header"]} ${sectionStyles["movie-content__section-header"]}`}
      >
        {creditsSectionHeader}
      </h2>
      <Tabs items={tabs} defaultActiveKey={"1"} />
      <Link href={`/movie/${movieDetails?.id}/credits`}>
        <Button>See all credits</Button>
      </Link>
    </section>
  );
};

export default MovieContentCredits;
