import React from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesCredits.module.scss";
import sectionStyles from "../Series.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { Tabs, TabsProps } from "antd";
import SeriesCreditsCarousel from "./SeriesCreditsCarousel/SeriesCreditsCarousel";

const SeriesCredits = () => {
  const details = useAppSelector((state) => state.series.details);
  const aggregateCredits = details?.aggregate_credits;

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: `CAST (${aggregateCredits?.cast?.length})`,
      children: <SeriesCreditsCarousel credits={aggregateCredits?.cast} />,
    },
    {
      key: "2",
      label: `CREW (${aggregateCredits?.crew?.length})`,
      children: <SeriesCreditsCarousel credits={aggregateCredits?.crew} />,
    },
  ];

  const creditsSectionHeader = `Credits of the series ${details?.name}`.toUpperCase();
  return (
    <section
      className={`${styles["series-credits"]} ${sectionStyles["series-section"]}`}
      aria-labelledby="series-credits"
    >
      <h2
        id="series-credits"
        className={`${styles["series-credits__header"]} ${sectionStyles["series-section__header"]}`}
      >
        {creditsSectionHeader}
      </h2>
      <Tabs items={tabs} defaultActiveKey={"1"} />
      <Link href={`/series/${details?.id}/credits`}>
        <Button>See all credits</Button>
      </Link>
    </section>
  );
};

export default SeriesCredits;
