import React from "react";
import styles from "./MovieContent.module.scss";
import MovieContentTopPanel from "./MovieContentTopPanel/MovieContentTopPanel";
import MovieContentReviews from "./MovieContentReviews/MovieContentReviews";
import MovieContentDescription from "./MovieContentDescription/MovieContentDescription";
import MovieContentImages from "./MovieContentImages/MovieContentImages";

const MovieContent = () => {
  return (
    <main className={styles["movie-content"]}>
      <MovieContentTopPanel />
      <MovieContentDescription />
      <MovieContentReviews />
      <MovieContentImages />
    </main>
  );
};

export default MovieContent;
