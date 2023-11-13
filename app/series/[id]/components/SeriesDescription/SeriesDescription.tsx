import React, { ReactNode } from "react";
import Image from "next/image";
import styles from "./SeriesDescription.module.scss";
import sectionStyles from "../../Series.module.scss";
import { findPeopleByJob } from "@/helpers/findPeopleByJob";
import { getGenresNames } from "@/helpers/getGenresNames";
import { getProductionCountries } from "@/helpers/getProductionCountries";
import Link from "next/link";
import Button from "@/components/Button/Button";
import SeriesContentNetworks from "../SeriesNetworks/SeriesNetworks";
import { SeriesDetails } from "@/types/types";

interface SeriesDetail {
  name: string;
  value: string | number | ReactNode | undefined;
}

interface SeriesDescriptionProps {
  seriesDetails: SeriesDetails;
}

const SeriesDescription = ({
  seriesDetails: {
    created_by,
    aggregate_credits,
    genres,
    production_countries,
    first_air_date,
    last_air_date,
    number_of_episodes,
    number_of_seasons,
    poster_path,
    networks,
    overview,
    id,
    seasons,
  },
}: SeriesDescriptionProps) => {
  const aggregateCredits = aggregate_credits;

  const displayedDetails: SeriesDetail[] = [
    {
      name: "Created by",
      value: created_by?.map((creator) => creator.name).join(", "),
    },
    {
      name: "Screenplay",
      value: findPeopleByJob("Screenplay", aggregateCredits?.crew),
    },
    { name: "Genres", value: getGenresNames(genres) },
    {
      name: "Production",
      value: getProductionCountries(production_countries),
    },
    { name: "First air date", value: first_air_date },
    { name: "Last air date", value: last_air_date },
    { name: "Seasons", value: number_of_seasons },
    { name: "Episodes", value: number_of_episodes },
  ];

  return (
    <section
      className={`${styles["series-description"]} ${sectionStyles["series-section"]}`}
    >
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
          alt=""
          width={200}
          height={300}
          className={styles["series-description__image"]}
        />
        {networks && networks?.length > 0 && (
          <SeriesContentNetworks seriesNetworks={networks} />
        )}
      </div>
      <div className={styles["series-description__info"]}>
        <p className={styles["series-description__overview"]}>{overview}</p>
        <ul className={styles["series-description__seasons"]}>
          {seasons?.map((season) => (
            <li
              key={season.name}
              className={styles["series-description__season"]}
            >
              <Link href={`/series/${id}/season/${season.season_number}`}>
                <Button>{season?.name}</Button>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles["series-description__details"]}>
          {displayedDetails.map(
            (detail) =>
              detail?.value && (
                <div
                  className={styles["series-description__detail"]}
                  key={detail.name}
                >
                  <p className={styles["series-description__detail-name"]}>
                    {detail.name}
                  </p>
                  <p className={styles["series-description__detail-value"]}>
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

export default SeriesDescription;
