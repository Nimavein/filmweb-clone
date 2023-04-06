import React from "react";
import { useAppSelector } from "@/store";
import MovieImagesListItem from "./MovieImagesListItem/MovieImagesListItem";
import styles from "./MovieImagesList.module.scss";

const MovieImagesList = () => {
  const { images, movieDetails } = useAppSelector((state) => state.movie);

  return (
    <section className={styles["movie-images"]}>
      <h1
        className={styles["movie-images__title"]}
      >{`Images of ${movieDetails?.title}`}</h1>
      <ul className={styles["movie-images__list"]}>
        {images?.backdrops?.map((image) => (
          <li
            key={image.file_path}
            className={styles["movie-images__list-item"]}
          >
            <MovieImagesListItem {...image} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieImagesList;
