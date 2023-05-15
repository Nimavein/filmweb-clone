import React, { ReactNode } from "react";
import Image from "next/image";
import { useAppSelector } from "@/store";
import styles from "./SeriesDescription.module.scss";
import sectionStyles from "../Series.module.scss";
import { findPeopleByJob } from "@/helpers/findPeopleByJob";
import { getGenresNames } from "@/helpers/getGenresNames";
import { getProductionCountries } from "@/helpers/getProductionCountries";
import Link from "next/link";
import Button from "@/components/Button/Button";
import SeriesContentNetworks from "../SeriesNetworks/SeriesNetworks";

interface SeriesDetail {
  name: string;
  value: string | number | ReactNode | undefined;
}

const SeriesDescription = () => {
  const details = useAppSelector((state) => state.series.details);
  const aggregateCredits = details?.aggregate_credits;

  const displayedDetails: SeriesDetail[] = [
    {
      name: "Created by",
      value: details?.created_by?.map((creator) => creator.name).join(", "),
    },
    {
      name: "Screenplay",
      value: findPeopleByJob("Screenplay", aggregateCredits?.crew),
    },
    { name: "Genres", value: getGenresNames(details?.genres) },
    {
      name: "Production",
      value: getProductionCountries(details?.production_countries),
    },
    { name: "First air date", value: details?.first_air_date },
    { name: "Last air date", value: details?.last_air_date },
    { name: "Seasons", value: details?.number_of_seasons },
    { name: "Episodes", value: details?.number_of_episodes },
  ];

  return (
    <section
      className={`${styles["series-description"]} ${sectionStyles["series-section"]}`}
    >
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${details?.poster_path}`}
          alt=""
          width={200}
          height={300}
          className={styles["series-description__image"]}
        />
        {details?.networks && details?.networks?.length > 0 && (
          <SeriesContentNetworks />
        )}
      </div>
      <div className={styles["series-description__info"]}>
        <p className={styles["series-description__overview"]}>
          {details?.overview}
        </p>
        <ul className={styles["series-description__seasons"]}>
          {details?.seasons?.map((season) => (
            <li
              key={season.name}
              className={styles["series-description__season"]}
            >
              <Link
                href={`/series/${details?.id}/season/${season.season_number}`}
              >
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
