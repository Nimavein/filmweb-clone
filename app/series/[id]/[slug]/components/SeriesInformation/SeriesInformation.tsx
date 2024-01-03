import React, { ReactNode } from "react";
import styles from "./SeriesInformation.module.scss";
import sectionStyles from "../../Series.module.scss";
import CircularProgressbar from "@/components/CircularProgressbar/CircularProgressbar";
import { SeriesDetails } from "@/types/types";

interface SeriesInformationType {
  name: string;
  value: string | undefined | number | ReactNode;
}

interface SeriesInformationProps {
  seriesDetails: SeriesDetails;
}

const SeriesInformation = ({
  seriesDetails: {
    name,
    origin_country,
    tagline,
    production_companies,
    spoken_languages,
    original_name,
    popularity,
    status,
  },
}: SeriesInformationProps) => {
  const informationSectionHeader =
    `Information about the series ${name}`.toUpperCase();

  const information: SeriesInformationType[] = [
    {
      name: "Origin Country",
      value: origin_country?.map((country) => country).join(", "),
    },
    { name: "Tagline", value: tagline },
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
    { name: "Original name", value: original_name },
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
      className={`${styles["series-information"]} ${sectionStyles["series-section"]}`}
      aria-labelledby="series-information"
    >
      <h2
        id="series-information"
        className={`${styles["series-information__header"]} ${sectionStyles["series-section__header"]}`}
      >
        {informationSectionHeader}
      </h2>
      <ul className={styles["series-information__details"]}>
        {information.map(
          (informationDetail) =>
            informationDetail?.value && (
              <li
                className={styles["series-information__detail"]}
                key={informationDetail.name}
              >
                <p className={styles["series-information__detail-name"]}>
                  {informationDetail.name}
                </p>
                <p className={styles["series-information__detail-value"]}>
                  {informationDetail.value}
                </p>
              </li>
            )
        )}
      </ul>
    </section>
  );
};

export default SeriesInformation;
