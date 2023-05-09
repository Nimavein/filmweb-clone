import React from "react";
import styles from "./MovieTopPanel.module.scss";
import Image from "next/image";
import { formatDuration } from "date-fns";
import Rating from "@/components/Rating/Rating";
import { useAppSelector } from "@/store";

const MovieTopPanel = () => {
  const { movieDetails } = useAppSelector((state) => state.movie);

  const movieDuration = { minutes: movieDetails?.runtime };
  const formattedMovieDuration = formatDuration(movieDuration, {
    format: ["hours", "minutes"],
  });

  return (
    <section className={styles["movie-top-panel"]}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movieDetails?.backdrop_path}`}
        alt=""
        fill
        className={styles["movie-top-panel__banner"]}
        quality={100}
      />
      <div className={styles["movie-top-panel__details"]}>
        <h1 className={styles["movie-top-panel__title"]}>{movieDetails?.title}</h1>
        <div className={styles["movie-top-panel__wrapper"]}>
          <span className={styles["movie-top-panel__title-original"]}>
            {movieDetails?.original_title}
          </span>
          <span className={styles["movie-top-panel__release"]}>
            {movieDetails?.release_date?.substring(0, 4)}
          </span>
          <span className={styles["movie-top-panel__runtime"]}>{formattedMovieDuration}</span>
        </div>
        <div className={styles["movie-top-panel__rating"]}>
          <Rating
            fontSize={24}
            small
            defaultValue={
              movieDetails?.vote_average ? parseFloat(movieDetails?.vote_average.toFixed(2)) : 0
            }
            voteCount={movieDetails?.vote_count}
          />
        </div>
      </div>
    </section>
  );
};

export default MovieTopPanel;
