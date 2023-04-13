import React from "react";
import styles from "./SeriesSeasonContent.module.scss";
import { useAppSelector } from "@/store";
import SeriesSeasonContentTopPanel from "./SeriesSeasonContentTopPanel/SeriesSeasonContentTopPanel";
import SeriesSeasonContentSeasons from "./SeriesSeasonContentSeasons/SeriesSeasonContentSeasons";
import SeriesSeasonContentEpisodes from "./SeriesSeasonContentEpisodes/SeriesSeasonContentEpisodes";

const SeriesSeasonContent = () => {
  const { details } = useAppSelector((state) => state.series);

  return (
    <main className={styles["series-season-content"]}>
      <SeriesSeasonContentTopPanel />
      <SeriesSeasonContentSeasons />
      <SeriesSeasonContentEpisodes />
    </main>
  );
};

export default SeriesSeasonContent;
