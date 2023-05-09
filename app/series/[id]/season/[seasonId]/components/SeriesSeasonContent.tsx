import React from "react";
import styles from "./SeriesSeasonContent.module.scss";
import SeriesSeasonContentTopPanel from "./SeriesSeasonContentTopPanel/SeriesSeasonContentTopPanel";
import SeriesSeasonContentSeasons from "./SeriesSeasonContentSeasons/SeriesSeasonContentSeasons";
import SeriesSeasonContentEpisodes from "./SeriesSeasonContentEpisodes/SeriesSeasonContentEpisodes";

const SeriesSeasonContent = () => {
  return (
    <main className={styles["series-season-content"]}>
      <SeriesSeasonContentTopPanel />
      <SeriesSeasonContentSeasons />
      <SeriesSeasonContentEpisodes />
    </main>
  );
};

export default SeriesSeasonContent;
