import React from "react";
import { useAppSelector } from "@/store";
import styles from "./MovieCollection.module.scss";
import sectionStyles from "../Movie.module.scss";
import MovieCollectionItem from "./MovieCollectionItem/MovieCollectionItem";

const MovieCollection = () => {
  const {collection} = useAppSelector((state) => state.movie);

  const imagesSectionHeader = collection?.name?.toUpperCase();

  return (
    <section
      className={`${styles["movie-collection"]} ${sectionStyles["movie-section"]}`}
      aria-labelledby="movie-collection"
    >
      <h2
        id="movie-collection"
        className={`${styles["movie-collection__header"]} ${sectionStyles["movie-section__header"]}`}
      >
        {imagesSectionHeader}
      </h2>
      <ul className={styles["movie-collection__list"]}>
        {collection?.parts.map((collectionMovie) => (
          <li key={collectionMovie.id}>
            <MovieCollectionItem {...collectionMovie} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieCollection;
