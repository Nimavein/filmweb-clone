import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/store";
import styles from "./MovieContentDescription.module.scss";
import { findPeopleByJob } from "@/helpers/findPeopleByJob";
import { getGenresNames } from "@/helpers/getGenresNames";
import { getProductionCountries } from "@/helpers/getProductionCountries";

interface MovieDetail {
  name: string;
  value: string | undefined;
}

const MovieContentDescription = () => {
  const movieDetails = useAppSelector((state) => state.movie.movieDetails);
  const credits = movieDetails?.credits;

  const details: MovieDetail[] = [
    { name: "Screenplay", value: findPeopleByJob("Screenplay", credits?.crew) },
    { name: "Genres", value: getGenresNames(movieDetails?.genres) },
    {
      name: "Production",
      value: getProductionCountries(movieDetails?.production_countries),
    },
    { name: "Release", value: movieDetails?.release_date },
  ];

  return (
    <section className={styles["movie-content__description"]}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movieDetails?.poster_path}`}
        alt=""
        width={200}
        height={300}
        className={styles["movie-content__description-image"]}
      />
      <div className={styles["movie-content__description-info"]}>
        <p className={styles["movie-content__description-overview"]}>
          {movieDetails?.overview}
        </p>
        <div className={styles["movie-content__description-details"]}>
          {details.map(
            (detail) =>
              detail?.value && (
                <div
                  className={styles["movie-content__description-detail"]}
                  key={detail.name}
                >
                  <p
                    className={styles["movie-content__description-detail-name"]}
                  >
                    {detail.name}
                  </p>
                  <p
                    className={
                      styles["movie-content__description-detail-value"]
                    }
                  >
                    {detail.value}
                  </p>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieContentDescription;
