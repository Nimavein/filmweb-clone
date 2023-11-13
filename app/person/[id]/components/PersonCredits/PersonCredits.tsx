"use client";

import React from "react";
import styles from "./PersonCredits.module.scss";
import sectionStyles from "../../Person.module.scss";
import { Tabs, TabsProps } from "antd";
import {
  PersonDetails,
  PersonMovieCast,
  PersonMovieCrew,
  PersonTvCast,
  PersonTvCrew,
} from "@/types/types";
import PersonCreditsCarousel from "./PersonCreditsCarousel/PersonCreditsCarousel";

interface PersonCreditsProps {
  cast: PersonMovieCast | PersonTvCast | undefined;
  crew: PersonMovieCrew | PersonTvCrew | undefined;
  type: "movies" | "tv-series";
  personDetails: PersonDetails;
}

const PersonCredits = ({
  cast,
  crew,
  type,
  personDetails,
}: PersonCreditsProps) => {
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: `AS CAST MEMBER (${cast?.length})`,
      children: <PersonCreditsCarousel type={type} credits={cast} />,
      disabled: cast?.length === 0,
    },
    {
      key: "2",
      label: `AS CREW MEMBER (${crew?.length})`,
      children: <PersonCreditsCarousel type={type} credits={crew} />,
      disabled: crew?.length === 0,
    },
  ];

  const creditsSectionHeader = `${
    type === "movies" ? "Movies" : "TV series"
  } associated with ${personDetails?.name}`.toUpperCase();
  return (
    <section
      className={`${styles["person-credits"]} ${sectionStyles["person-section"]}`}
      aria-labelledby={`person-credits-${type}`}
    >
      <h2
        id={`person-credits-${type}`}
        className={`${styles["person-credits__header"]} ${sectionStyles["person-section__header"]}`}
      >
        {creditsSectionHeader}
      </h2>
      <Tabs items={tabs} defaultActiveKey={"1"} />
    </section>
  );
};

export default PersonCredits;
