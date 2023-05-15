import React, { ReactNode } from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesInformation.module.scss";
import sectionStyles from "../Series.module.scss";
import { CircularProgressbar } from "react-circular-progressbar";

interface SeriesInformationType {
  name: string;
  value: string | undefined | number | ReactNode;
}

const SeriesInformation = () => {
  const { details } = useAppSelector((state) => state.series);

  const informationSectionHeader =
    `Information about the series ${details?.name}`.toUpperCase();

  const information: SeriesInformationType[] = [
    {
      name: "Origin Country",
      value: details?.origin_country?.map((country) => country).join(", "),
    },
    { name: "Tagline", value: details?.tagline },
    {
      name: "Production Companies",
      value: details?.production_companies
        ?.map((company) => company.name)
        ?.join(", "),
    },
    {
      name: "Spoken languages",
      value: details?.spoken_languages
        ?.map((language) => language.english_name)
        ?.join(", "),
    },
    { name: "Original name", value: details?.original_name },
    {
      name: "Popularity",
      value: (
        <CircularProgressbar
          strokeWidth={14}
          background
          maxValue={10000}
          value={details?.popularity || 0}
        />
      ),
    },
    { name: "Status", value: details?.status },
  ];

  return (
    <section
      className={`${styles["series-information"]} ${sectionStyles["series-section"]}`}
      aria-labelledby="series-information"
    >
      <h2
        id="series-information"
        className={`${styles["series-information__header"]} ${sectionStyles["series-section__header"]}`}
      >
        {informationSectionHeader}
      </h2>
      <div className={styles["series-information__details"]}>
        {information.map(
          (informationDetail) =>
            informationDetail?.value && (
              <div
                className={styles["series-information__detail"]}
                key={informationDetail.name}
              >
                <p className={styles["series-information__detail-name"]}>
                  {informationDetail.name}
                </p>
                <p className={styles["series-information__detail-value"]}>
                  {informationDetail.value}
                </p>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default SeriesInformation;
