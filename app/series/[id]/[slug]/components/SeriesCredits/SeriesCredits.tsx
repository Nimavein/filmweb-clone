"use client";

import React from "react";
import styles from "./SeriesCredits.module.scss";
import sectionStyles from "../../Series.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { Tabs, TabsProps } from "antd";
import SeriesCreditsCarousel from "./SeriesCreditsCarousel/SeriesCreditsCarousel";
import { SeriesDetails } from "@/types/types";
import getHref from "@/helpers/getHref";

interface SeriesCreditsProps {
  seriesDetails: SeriesDetails;
}

const SeriesCredits = ({
  seriesDetails: { name, aggregate_credits, id },
}: SeriesCreditsProps) => {
  const aggregateCredits = aggregate_credits;

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

  const creditsSectionHeader = `Credits of the series ${name}`.toUpperCase();
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
      <Link href={`${getHref("tv", name, id)}credits`}>
        <Button>See all credits</Button>
      </Link>
    </section>
  );
};

export default SeriesCredits;
