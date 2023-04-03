import React from "react";
import styles from "../MovieContent.module.scss";
import Image from "next/image";
import { formatDuration } from "date-fns";
import { StarFilled } from "@ant-design/icons";

interface MovieContentTopPanelProps {
  backdrop_path: string;
  original_title: string;
  runtime: number;
  release_date: string;
  vote_count: number;
  vote_average: number;
  title: string;
}

const MovieContentTopPanel = ({
  backdrop_path,
  original_title,
  runtime,
  release_date,
  vote_count,
  vote_average,
  title,
}: MovieContentTopPanelProps) => {
  const movieDuration = { minutes: runtime };
  const formattedMovieDuration = formatDuration(movieDuration, {
    format: ["hours", "minutes"],
  });
  return (
    <section className={styles["movie-content__top-panel"]}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${backdrop_path}`}
        alt=""
        fill
        className={styles["movie-content__top-panel-banner"]}
      />
      <div className={styles["movie-content__top-panel-details"]}>
        <h1 className={styles["movie-content__top-panel-title"]}>{title}</h1>
        <div className={styles["movie-content__top-panel-wrapper"]}>
          <span className={styles["movie-content__top-panel-title-original"]}>
            {original_title}
          </span>
          <span className={styles["movie-content__top-panel-release"]}>
            {release_date}
          </span>
          <span className={styles["movie-content__top-panel-runtime"]}>
            {formattedMovieDuration}
          </span>
        </div>
        <div className={styles["movie-content__top-panel-rating"]}>
          <StarFilled />
          <span className={styles["movie-content__top-panel-votes-count"]}>
            {vote_count}
          </span>
          <span className={styles["movie-content__top-panel-votes-average"]}>
            {vote_average}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MovieContentTopPanel;
