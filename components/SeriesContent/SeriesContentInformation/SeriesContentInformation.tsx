import React, { ReactNode } from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesContentInformation.module.scss";
import sectionStyles from "../SeriesContent.module.scss";
import { CircularProgressbar } from "react-circular-progressbar";

interface SeriesInformation {
  name: string;
  value: string | undefined | number | ReactNode;
}

const SeriesContentInformation = () => {
  const { details } = useAppSelector((state) => state.series);

  const informationSectionHeader =
    `Information about the series ${details?.name}`.toUpperCase();

  const information: SeriesInformation[] = [
    {
      name: "Origin Country",
      value: details?.origin_country?.map((country) => country).join(", "),
    },
    { name: "Tagline", value: details?.tagline },
    {
      name: "Production Companies",
      value: details?.production_companies?.map((company) => company.name)?.join(", "),
    },
    {
      name: "Spoken languages",
      value: details?.spoken_languages?.map((language) => language.english_name)?.join(", "),
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
      className={`${styles["series-content__information"]} ${sectionStyles["series-content__section"]}`}
      aria-labelledby="series-content-information"
    >
      <h2
        id="series-content-information"
        className={`${styles["series-content__information-header"]} ${sectionStyles["series-content__section-header"]}`}
      >
        {informationSectionHeader}
      </h2>
      <div className={styles["series-content__information-details"]}>
        {information.map(
          (informationDetail) =>
            informationDetail?.value && (
              <div
                className={styles["series-content__information-detail"]}
                key={informationDetail.name}
              >
                <p className={styles["series-content__information-detail-name"]}>
                  {informationDetail.name}
                </p>
                <p className={styles["series-content__information-detail-value"]}>
                  {informationDetail.value}
                </p>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default SeriesContentInformation;
