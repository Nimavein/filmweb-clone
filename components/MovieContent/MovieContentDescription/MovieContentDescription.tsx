import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/store";
import styles from "./MovieContentDescription.module.scss";

const MovieContentDescription = () => {
  const { credits, movieDetails } = useAppSelector((state) => state.movie);

  return (
    <section className={styles["movie-content__description"]}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movieDetails?.poster_path}`}
        alt=""
        width={200}
        height={300}
        className={styles["movie-content__image"]}
      />
      <div className={styles["movie-content__info"]}>
        <p className={styles["movie-content__info-overview"]}>
          {movieDetails?.overview}
        </p>
      </div>
    </section>
  );
};

export default MovieContentDescription;
