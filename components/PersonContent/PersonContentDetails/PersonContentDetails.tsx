import React, { ReactNode, useState } from "react";
import { useAppSelector } from "@/store";
import styles from "./PersonContentDetails.module.scss";
import sectionStyles from "../PersonContent.module.scss";
import Image from "next/image";
import ReadMoreText from "@/components/ReadMoreText/ReadMoreText";
import { CircularProgressbar } from "react-circular-progressbar";
import { getYear } from "date-fns";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";

interface PersonDetail {
  name: string;
  value: string | undefined | null | ReactNode;
}

const PersonContentDetails = () => {
  const [isReadMoreBiography, setIsReadMoreBiography] = useState<boolean>(false);
  const { details } = useAppSelector((state) => state.person);
  const currentYear = getYear(new Date());
  const birthYear = details?.birthday && parseInt(details?.birthday?.slice(0, 4));
  const deathYear = details?.deathday && parseInt(details?.deathday?.slice(0, 4));
  const age = birthYear && (deathYear ? deathYear - birthYear : currentYear - birthYear);

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
    <section
      className={`${styles["person-content__details"]} ${sectionStyles["person-content__section"]}`}
    >
      <div className={styles["person-content__details-top"]}>
        {details?.profile_path ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${details?.profile_path}`}
            alt=""
            width={200}
            height={300}
            className={styles["person-content__details-image"]}
          />
        ) : (
          <ImagePlaceholder height={300} width={200} />
        )}
        <div className={styles["person-content__details-text"]}>
          <h1 className={styles["person-content__details-name"]}>{details?.name}</h1>
          {details?.also_known_as && (
            <p className={styles["person-content__details-aka"]}>
              {details?.also_known_as.join(", ")}
            </p>
          )}
          {details?.biography && (
            <ReadMoreText
              text={details?.biography}
              showTextLength={400}
              isReadMore={isReadMoreBiography}
              setIsReadMore={setIsReadMoreBiography}
              textClassName={styles["person-content__details-bio"]}
            />
          )}
          <h2 className={styles["person-content__details-personal-header"]}> Personal data:</h2>
          <div className={styles["person-content__details-personal"]}>
            {detailsToDisplay.map(
              (detail) =>
                detail?.value && (
                  <div
                    className={styles["person-content__details-personal-detail"]}
                    key={detail.name}
                  >
                    <p className={styles["person-content__details-personal-detail-name"]}>
                      {detail.name}
                    </p>
                    <p className={styles["person-content__details-personal-detail-value"]}>
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

export default PersonContentDetails;
