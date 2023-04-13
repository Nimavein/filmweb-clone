import React from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesContentCredits.module.scss";
import sectionStyles from "../SeriesContent.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { Tabs, TabsProps } from "antd";
import SeriesContentCreditsCarousel from "./SeriesContentCreditsCarousel/SeriesContentCreditsCarousel";

const SeriesContentCredits = () => {
  const { aggregateCredits, details } = useAppSelector((state) => state.series);

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: `CAST (${aggregateCredits?.cast?.length})`,
      children: <SeriesContentCreditsCarousel credits={aggregateCredits?.cast} />,
    },
    {
      key: "2",
      label: `CREW (${aggregateCredits?.crew?.length})`,
      children: <SeriesContentCreditsCarousel credits={aggregateCredits?.crew} />,
    },
  ];

  const creditsSectionHeader = `Credits of the series ${details?.name}`.toUpperCase();
  return (
    <section
      className={`${styles["series-content__credits"]} ${sectionStyles["series-content__section"]}`}
      aria-labelledby="series-content-credits"
    >
      <h2
        id="series-content-cast"
        className={`${styles["series-content__images-header"]} ${sectionStyles["series-content__section-header"]}`}
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

export default SeriesContentCredits;
