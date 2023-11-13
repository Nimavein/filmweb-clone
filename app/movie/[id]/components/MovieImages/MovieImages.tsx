import React from "react";
import styles from "./MovieImages.module.scss";
import sectionStyles from "../../Movie.module.scss";
import MovieContentImage from "./MovieImage/MovieImage";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { MovieDetails } from "@/types/types";

interface MovieImagesProps {
  movieDetails: MovieDetails;
}

const MovieImages = ({
  movieDetails: { title, images, id },
}: MovieImagesProps) => {
  const displayedImagesAmount = 12;

  const imagesSectionHeader = `Images of the movie ${title}`.toUpperCase();

  return (
    <section
      className={`${styles["movie-images"]} ${sectionStyles["movie-section"]}`}
      aria-labelledby="movie-content-images"
    >
      <h2
        id="movie-content-images"
        className={`${styles["movie-images__header"]} ${sectionStyles["movie-section__header"]}`}
      >
        {imagesSectionHeader}
      </h2>
      <ul className={styles["movie-images__list"]}>
        {images?.backdrops?.slice(0, displayedImagesAmount)?.map(
          (image) =>
            image.aspect_ratio &&
            image.file_path && (
              <li
                key={image.file_path}
                className={styles["movie-images__list-item"]}
              >
                <MovieContentImage {...image} />
              </li>
            )
        )}
      </ul>
      <Link href={`/movie/${id}/images`}>
        <Button>{`See all ${images?.backdrops?.length} images`}</Button>
      </Link>
    </section>
  );
};

export default MovieImages;
