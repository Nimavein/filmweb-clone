import React from "react";
import { MovieDetails } from "@/types/types";
import styles from "./MovieContent.module.scss";
import MovieContentTopPanel from "./MovieContentTopPanel/MovieContentTopPanel";
import MovieContentReviews from "./MovieContentReviews/MovieContentReviews";

const MovieContent = ({
  id,
  original_language,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  title,
  video,
  vote_average,
  vote_count,
  backdrop_path,
  runtime,
}: MovieDetails) => {
  return (
    <main className={styles["movie-content"]}>
      <MovieContentTopPanel
        backdrop_path={backdrop_path}
        original_title={original_title}
        runtime={runtime}
        release_date={release_date}
        vote_count={vote_count}
        vote_average={vote_average}
        title={title}
      />
      <MovieContentReviews id={id} />
    </main>
  );
};

export default MovieContent;
