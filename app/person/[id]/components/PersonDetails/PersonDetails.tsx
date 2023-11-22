import React, { ReactNode } from "react";
import styles from "./PersonDetails.module.scss";
import sectionStyles from "../../Person.module.scss";
import Image from "next/image";
import ReadMoreText from "@/components/ReadMoreText/ReadMoreText";
import { getYear } from "date-fns";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import { PersonDetails } from "@/types/types";
import CircularProgressbar from "@/components/CircularProgressbar/CircularProgressbar";

interface PersonDetail {
  name: string;
  value: string | undefined | null | ReactNode;
}

interface PersonDetailsProps {
  personDetails: PersonDetails;
}

const PersonDetails = ({
  personDetails: {
    birthday,
    deathday,
    place_of_birth,
    profile_path,
    name,
    also_known_as,
    popularity,
    biography,
  },
}: PersonDetailsProps) => {
  const currentYear = getYear(new Date());
  const birthYear = birthday && parseInt(birthday?.slice(0, 4));
  const deathYear = deathday && parseInt(deathday?.slice(0, 4));
  const age =
    birthYear && (deathYear ? deathYear - birthYear : currentYear - birthYear);
  const imageHeight = 300;
  const imageWidth = imageHeight * 0.667;

  const detailsToDisplay: PersonDetail[] = [
    {
      name: "Age",
      value: age,
    },
    { name: "Date of birth", value: birthday },
    { name: "Place of Birth", value: place_of_birth },
    { name: "Date of death", value: deathday },
    {
      name: "Popularity",
      value: (
        <CircularProgressbar
          strokeWidth={14}
          background
          maxValue={1000}
          value={popularity || 0}
        />
      ),
    },
  ];

  return (
    <section className={`${styles["person-details"]} ${sectionStyles["person-section"]}`}>
      <div className={styles["person-details__top"]}>
        <div className={styles["person-details__image"]}>
          {profile_path ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${profile_path}`}
              alt=""
              width={imageWidth}
              height={imageHeight}
              quality={100}
            />
          ) : (
            <ImagePlaceholder height={imageHeight} width={imageWidth} type="person" />
          )}
        </div>
        <div className={styles["person-details__text"]}>
          <h1 className={styles["person-details__name"]}>{name}</h1>
          {also_known_as && (
            <p className={styles["person-details__aka"]}>{also_known_as.join(", ")}</p>
          )}
          {biography && (
            <ReadMoreText
              text={biography}
              showTextLength={400}
              textClassName={styles["person-details__bio"]}
            />
          )}
          <h2 className={styles["person-details__personal-header"]}>Personal data:</h2>
          <div className={styles["person-details__personal"]}>
            {detailsToDisplay.map(
              (detail) =>
                detail?.value && (
                  <div className={styles["person-details__personal-detail"]} key={detail.name}>
                    <p className={styles["person-details__personal-detail-name"]}>{detail.name}</p>
                    <p className={styles["person-details__personal-detail-value"]}>
                      {detail.value}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonDetails;
