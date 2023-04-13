import React from "react";
import styles from "./SeriesSeasonContent.module.scss";
import { useAppSelector } from "@/store";
import SeriesSeasonContentTopPanel from "./SeriesSeasonContentTopPanel/SeriesSeasonContentTopPanel";

const SeriesSeasonContent = () => {
  const { details, reviews } = useAppSelector((state) => state.series);
  const aggregateCredits = details?.aggregate_credits;
  const images = details?.images;

  return (
    <main className={styles["series-season-content"]}>
      <SeriesSeasonContentTopPanel />
    </main>
  );
};

export default SeriesSeasonContent;
