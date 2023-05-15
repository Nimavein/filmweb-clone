import React, { ReactNode } from "react";
import { useAppSelector } from "@/store";
import styles from "./MovieInformation.module.scss";
import sectionStyles from "../Movie.module.scss";
import { formatCurrency } from "@/helpers/formatCurrency";
import { CircularProgressbar } from "react-circular-progressbar";

interface MovieInformationType {
  name: string;
  value: string | undefined | number | ReactNode;
}

const MovieInformation = () => {
  const { movieDetails } = useAppSelector((state) => state.movie);

  const informationSectionHeader =
    `Information about the movie ${movieDetails?.title}`.toUpperCase();

  const information: MovieInformationType[] = [
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
      className={`${styles["movie-information"]} ${sectionStyles["movie-section"]}`}
      aria-labelledby="movie-content-information"
    >
      <h2
        id="movie-content-information"
        className={`${styles["movie-information__header"]} ${sectionStyles["movie-section__header"]}`}
      >
        {informationSectionHeader}
      </h2>
      <ul className={styles["movie-information__details"]}>
        {information.map(
          (informationDetail) =>
            informationDetail?.value && (
              <li
                className={styles["movie-information__detail"]}
                key={informationDetail.name}
              >
                <p className={styles["movie-information__detail-name"]}>
                  {informationDetail.name}
                </p>
                <p className={styles["movie-information__detail-value"]}>
                  {informationDetail.value}
                </p>
              </li>
            )
        )}
      </ul>
    </section>
  );
};

export default MovieInformation;
