import React, { ReactNode } from "react";
import styles from "./MovieInformation.module.scss";
import sectionStyles from "../../Movie.module.scss";
import { formatCurrency } from "@/helpers/formatCurrency";
import { MovieDetails } from "@/types/types";
import CircularProgressbar from "@/components/CircularProgressbar/CircularProgressbar";

interface MovieInformationType {
  name: string;
  value: string | undefined | number | ReactNode;
}

interface MovieInformationProps {
  movieDetails: MovieDetails;
}

const MovieInformation = ({
  movieDetails: {
    title,
    revenue,
    tagline,
    budget,
    production_companies,
    spoken_languages,
    original_title,
    popularity,
    status,
  },
}: MovieInformationProps) => {
  const informationSectionHeader =
    `Information about the movie ${title}`.toUpperCase();

  const information: MovieInformationType[] = [
    {
      name: "Boxoffice",
      value: revenue ? formatCurrency(revenue) : "",
    },
    { name: "Tagline", value: tagline },
    {
      name: "Budget",
      value: budget ? formatCurrency(budget) : "",
    },
    {
      name: "Production Companies",
      value: production_companies?.map((company) => company.name)?.join(", "),
    },
    {
      name: "Spoken languages",
      value: spoken_languages
        ?.map((language) => language.english_name)
        ?.join(", "),
    },
    { name: "Original title", value: original_title },
    {
      name: "Popularity",
      value: (
        <CircularProgressbar
          strokeWidth={14}
          background
          maxValue={10000}
          value={popularity || 0}
        />
      ),
    },
    { name: "Status", value: status },
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
