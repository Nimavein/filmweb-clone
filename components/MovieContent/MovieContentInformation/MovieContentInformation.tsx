import React, { ReactNode } from "react";
import { useAppSelector } from "@/store";
import styles from "./MovieContentInformation.module.scss";
import sectionStyles from "../MovieContent.module.scss";
import { formatCurrency } from "@/helpers/formatCurrency";
import { CircularProgressbar } from "react-circular-progressbar";

interface MovieInformation {
  name: string;
  value: string | undefined | number | ReactNode;
}

const MovieContentInformation = () => {
  const { movieDetails } = useAppSelector((state) => state.movie);

  const informationSectionHeader =
    `Information about the movie ${movieDetails?.title}`.toUpperCase();

  const information: MovieInformation[] = [
    {
      name: "Boxoffice",
      value: movieDetails?.revenue ? formatCurrency(movieDetails?.revenue) : "",
    },
    { name: "Tagline", value: movieDetails?.tagline },
    {
      name: "Budget",
      value: movieDetails?.budget ? formatCurrency(movieDetails?.budget) : "",
    },
    {
      name: "Production Companies",
      value: movieDetails?.production_companies
        ?.map((company) => company.name)
        ?.join(", "),
    },
    {
      name: "Spoken languages",
      value: movieDetails?.spoken_languages
        ?.map((language) => language.english_name)
        ?.join(", "),
    },
    { name: "Original title", value: movieDetails?.original_title },
    {
      name: "Popularity",
      value: (
        <CircularProgressbar
          strokeWidth={14}
          background
          maxValue={10000}
          value={movieDetails?.popularity || 0}
        />
      ),
    },
    { name: "Status", value: movieDetails?.status },
  ];

  return (
    <section
      className={`${styles["movie-content__information"]} ${sectionStyles["movie-content__section"]}`}
      aria-labelledby="movie-content-reviews"
    >
      <h2
        id="movie-content-reviews"
        className={`${styles["movie-content__information-header"]} ${sectionStyles["movie-content__section-header"]}`}
      >
        {informationSectionHeader}
      </h2>
      <div className={styles["movie-content__information-details"]}>
        {information.map(
          (informationDetail) =>
            informationDetail?.value && (
              <div
                className={styles["movie-content__information-detail"]}
                key={informationDetail.name}
              >
                <p className={styles["movie-content__information-detail-name"]}>
                  {informationDetail.name}
                </p>
                <p
                  className={styles["movie-content__information-detail-value"]}
                >
                  {informationDetail.value}
                </p>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default MovieContentInformation;
