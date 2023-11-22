import React from "react";
import { PageIdParams } from "@/types/types";
import { getMovieData } from "@/apiHelpers";
import Image from "next/image";

import styles from "./MovieImages.module.scss";

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
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image.file_path}`}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </li>
              )
          )}
        </ul>
      </section>
    </main>
  );
};

export default MovieImages;
