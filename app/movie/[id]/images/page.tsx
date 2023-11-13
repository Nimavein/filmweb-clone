import React from "react";
import { PageIdParams } from "@/types/types";
import { getMovieData } from "@/api";

import styles from "./MovieImages.module.scss";
import MovieImage from "./components/MovieImage/MovieImage";

const MovieImages = async ({ params: { id } }: PageIdParams) => {
  const numberId = Number(id);
  const movieData = await getMovieData(numberId);
  const movieDetails = movieData?.movieDetails;
  const movieImages = movieDetails?.images;

  return (
    <main className={styles["movie-images"]}>
      <section className={styles["movie-images"]}>
        <h1
          className={styles["movie-images__title"]}
        >{`Images of ${movieDetails?.title}`}</h1>
        <ul className={styles["movie-images__list"]}>
          {movieImages?.backdrops?.map(
            (image) =>
              image.aspect_ratio &&
              image.file_path && (
                <li
                  key={image.file_path}
                  className={styles["movie-images__list-item"]}
                >
                  <MovieImage {...image} />
                </li>
              )
          )}
        </ul>
      </section>
    </main>
  );
};

export default MovieImages;
