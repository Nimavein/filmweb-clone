import React from "react";
import styles from "./MovieCollection.module.scss";
import sectionStyles from "../../Movie.module.scss";
import MovieCollectionItem from "./MovieCollectionItem/MovieCollectionItem";
import { CollectionDetails } from "@/types/types";

interface MovieCollectionProps {
  movieCollection: CollectionDetails;
}

const MovieCollection = ({ movieCollection }: MovieCollectionProps) => {
  const imagesSectionHeader = movieCollection?.name?.toUpperCase();

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
        {movieCollection?.parts.map((collectionItem) => (
          <li key={collectionItem.id}>
            <MovieCollectionItem {...collectionItem} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieCollection;
