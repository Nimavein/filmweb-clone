import React from "react";
import styles from "./MovieContentTopPanel.module.scss";
import Image from "next/image";
import { formatDuration } from "date-fns";
import Rating from "@/components/Rating/Rating";
import { useAppSelector } from "@/store";

const MovieContentTopPanel = () => {
  const { movieDetails } = useAppSelector((state) => state.movie);

  const movieDuration = { minutes: movieDetails?.runtime };
  const formattedMovieDuration = formatDuration(movieDuration, {
    format: ["hours", "minutes"],
  });
  return (
    <section className={styles["movie-content__top-panel"]}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movieDetails?.backdrop_path}`}
        alt=""
        fill
        className={styles["movie-content__top-panel-banner"]}
        quality={100}
      />
      <div className={styles["movie-content__top-panel-details"]}>
        <h1 className={styles["movie-content__top-panel-title"]}>
          {movieDetails?.title}
        </h1>
        <div className={styles["movie-content__top-panel-wrapper"]}>
          <span className={styles["movie-content__top-panel-title-original"]}>
            {movieDetails?.original_title}
          </span>
          <span className={styles["movie-content__top-panel-release"]}>
            {movieDetails?.release_date?.substring(0, 4)}
          </span>
          <span className={styles["movie-content__top-panel-runtime"]}>
            {formattedMovieDuration}
          </span>
        </div>
        <div className={styles["movie-content__top-panel-rating"]}>
          <Rating
            fontSize={24}
            small
            defaultValue={
              movieDetails?.vote_average
                ? parseFloat(movieDetails?.vote_average.toFixed(2))
                : 0
            }
          />
          <div className={styles["movie-content__top-panel-votes-count"]}>
            <span
              className={styles["movie-content__top-panel-votes-count-value"]}
            >
              {movieDetails?.vote_count}
            </span>
            <span
              className={styles["movie-content__top-panel-votes-count-title"]}
            >
              votes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieContentTopPanel;
