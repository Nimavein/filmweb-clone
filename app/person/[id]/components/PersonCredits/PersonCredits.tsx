"use client";

import React from "react";
import styles from "./PersonCredits.module.scss";
import sectionStyles from "../../Person.module.scss";
import {
  MediaType,
  PersonDetails,
  PersonMovieCast,
  PersonMovieCrew,
  PersonTvCast,
  PersonTvCrew,
} from "@/types/types";
import PersonCreditsCarousel from "./PersonCreditsCarousel/PersonCreditsCarousel";
import Tabs from "@/components/Tabs/Tabs";

interface PersonCreditsProps {
  cast: PersonMovieCast | PersonTvCast | undefined;
  crew: PersonMovieCrew | PersonTvCrew | undefined;
  mediaType: MediaType;
  personDetails: PersonDetails;
}

const PersonCredits = ({
  cast,
  crew,
  mediaType,
  personDetails,
}: PersonCreditsProps) => {
  const tabs = [
    {
      key: "cast",
      label: `AS CAST MEMBER (${cast?.length})`,
      children: <PersonCreditsCarousel mediaType={mediaType} credits={cast} />,
      disabled: cast?.length === 0,
    },
    {
      key: "crew",
      label: `AS CREW MEMBER (${crew?.length})`,
      children: <PersonCreditsCarousel mediaType={mediaType} credits={crew} />,
      disabled: crew?.length === 0,
    },
  ];

  const creditsSectionHeader = `${
    mediaType === "movie" ? "Movies" : "TV series"
  } associated with ${personDetails?.name}`.toUpperCase();
  return (
    <section
      className={`${styles["person-credits"]} ${sectionStyles["person-section"]}`}
      aria-labelledby={`person-credits-${mediaType}`}
    >
      <h2
        id={`person-credits-${mediaType}`}
        className={`${styles["person-credits__header"]} ${sectionStyles["person-section__header"]}`}
      >
        {creditsSectionHeader}
      </h2>
      <Tabs
        items={tabs}
        defaultActiveKey={`cast`}
        paramKey={`credits-${mediaType}`}
      />
    </section>
  );
};

export default PersonCredits;
