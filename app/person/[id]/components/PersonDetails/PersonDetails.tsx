import React, { ReactNode } from "react";
import { useAppSelector } from "@/store";
import styles from "./PersonDetails.module.scss";
import sectionStyles from "../Person.module.scss";
import Image from "next/image";
import ReadMoreText from "@/components/ReadMoreText/ReadMoreText";
import { CircularProgressbar } from "react-circular-progressbar";
import { getYear } from "date-fns";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";

interface PersonDetail {
  name: string;
  value: string | undefined | null | ReactNode;
}

const PersonDetails = () => {
  const { details } = useAppSelector((state) => state.person);
  const currentYear = getYear(new Date());
  const birthYear = details?.birthday && parseInt(details?.birthday?.slice(0, 4));
  const deathYear = details?.deathday && parseInt(details?.deathday?.slice(0, 4));
  const age = birthYear && (deathYear ? deathYear - birthYear : currentYear - birthYear);
  const imageHeight = 300;
  const imageWidth = imageHeight * 0.667;

  const detailsToDisplay: PersonDetail[] = [
    {
      name: "Age",
      value: age,
    },
    { name: "Date of birth", value: details?.birthday },
    { name: "Place of Birth", value: details?.place_of_birth },
    { name: "Date of death", value: details?.deathday },
    {
      name: "Popularity",
      value: (
        <CircularProgressbar
          strokeWidth={14}
          background
          maxValue={1000}
          value={details?.popularity || 0}
        />
      ),
    },
  ];

  return (
    <section className={`${styles["person-details"]} ${sectionStyles["person-section"]}`}>
      <div className={styles["person-details__top"]}>
        {details?.profile_path ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${details?.profile_path}`}
            alt=""
            width={imageWidth}
            height={imageHeight}
          />
        ) : (
          <ImagePlaceholder height={imageHeight} width={imageWidth} />
        )}
        <div className={styles["person-details__text"]}>
          <h1 className={styles["person-details__name"]}>{details?.name}</h1>
          {details?.also_known_as && (
            <p className={styles["person-details__aka"]}>{details?.also_known_as.join(", ")}</p>
          )}
          {details?.biography && (
            <ReadMoreText
              text={details?.biography}
              showTextLength={400}
              textClassName={styles["person-details__bio"]}
            />
          )}
          <h2 className={styles["person-details__personal-header"]}> Personal data:</h2>
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
