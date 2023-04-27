import React from "react";
import { useAppSelector } from "@/store";
import styles from "./MovieContentCollection.module.scss";
import sectionStyles from "../MovieContent.module.scss";
import MovieContentCollectionItem from "./MovieContentCollectionItem/MovieContentCollectionItem";

const MovieContentCollection = () => {
  const {collection} = useAppSelector((state) => state.movie);

  const imagesSectionHeader = collection?.name?.toUpperCase();

  return (
    <section
      className={`${styles["movie-content__collection"]} ${sectionStyles["movie-content__section"]}`}
      aria-labelledby="movie-content-collection"
    >
      <h2
        id="movie-content-collection"
        className={`${styles["movie-content__collection-header"]} ${sectionStyles["movie-content__section-header"]}`}
      >
        {imagesSectionHeader}
      </h2>
      <ul className={styles["movie-content__collection-list"]}>
        {collection?.parts.map((collectionMovie) => (
          <li key={collectionMovie.id}>
            <MovieContentCollectionItem {...collectionMovie} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieContentCollection;
