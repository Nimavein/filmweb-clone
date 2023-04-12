import React from "react";
import styles from "./PersonContentCredits.module.scss";
import sectionStyles from "../PersonContent.module.scss";
import { useAppSelector } from "@/store";
import { Tabs, TabsProps } from "antd";
import { PersonMovieCast, PersonMovieCrew, PersonTvCast, PersonTvCrew } from "@/types/types";
import PersonContentCreditsCarousel from "./PersonContentCreditsCarousel/PersonContentCreditsCarousel";

interface PersonContentCreditsProps {
  cast: PersonMovieCast | PersonTvCast  | undefined;
  crew: PersonMovieCrew | PersonTvCrew | undefined;
  type: "movies" | "tv-series";
}

const PersonContentCredits = ({ cast, crew, type }: PersonContentCreditsProps) => {
  const { details } = useAppSelector((state) => state.person);

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: `AS CAST MEMBER (${cast?.length})`,
      children: <PersonContentCreditsCarousel credits={cast} />,
      disabled: cast?.length === 0,
    },
    {
      key: "2",
      label: `AS CREW MEMBER (${crew?.length})`,
      children: <PersonContentCreditsCarousel credits={crew} />,
      disabled: crew?.length === 0,
    },
  ];

  const creditsSectionHeader = `${type === "movies" ? "Movies" : "TV series"} associated with ${details?.name}`.toUpperCase();
  return (
    <section
      className={`${styles["person-content__credits"]} ${sectionStyles["person-content__section"]}`}
      aria-labelledby={`person-content-credits-${type}`}
    >
      <h2
        id={`person-content-credits-${type}`}
        className={`${styles["person-content__credits-header"]} ${sectionStyles["person-content__section-header"]}`}
      >
        {creditsSectionHeader}
      </h2>
      <Tabs items={tabs} defaultActiveKey={"1"} />
    </section>
  );
};

export default PersonContentCredits;
