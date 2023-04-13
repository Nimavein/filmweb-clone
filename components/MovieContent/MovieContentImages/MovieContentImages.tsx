import React from "react";
import { useAppSelector } from "@/store";
import styles from "./MovieContentImages.module.scss";
import sectionStyles from "../MovieContent.module.scss";
import MovieContentImage from "./MovieContentImage/MovieContentImage";
import Button from "@/components/Button/Button";
import Link from "next/link";

const MovieContentImages = () => {
  const { images, movieDetails } = useAppSelector((state) => state.movie);
  const displayedImagesAmount = 12;

  const imagesSectionHeader =
    `Images of the movie ${movieDetails?.title}`.toUpperCase();

  return (
    <section
      className={`${styles["movie-content__images"]} ${sectionStyles["movie-content__section"]}`}
      aria-labelledby="movie-content-images"
    >
      <h2
        id="movie-content-images"
        className={`${styles["movie-content__images-header"]} ${sectionStyles["movie-content__section-header"]}`}
      >
        {imagesSectionHeader}
      </h2>
      <ul className={styles["movie-content__images-list"]}>
        {images?.backdrops?.slice(0, displayedImagesAmount)?.map((image) => (
          <li
            key={image.file_path}
            className={styles["movie-content__images-list-item"]}
          >
            <MovieContentImage {...image} />
          </li>
        ))}
      </ul>
      <Link href={`/movie/${movieDetails?.id}/images`}>
        <Button>{`See all ${images?.backdrops?.length} images`}</Button>
      </Link>
    </section>
  );
};

export default MovieContentImages;
