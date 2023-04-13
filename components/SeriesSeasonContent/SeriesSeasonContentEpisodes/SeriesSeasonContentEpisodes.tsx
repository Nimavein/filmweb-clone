import React from "react";
import styles from "./SeriesSeasonContentEpisodes.module.scss";
import sectionStyles from "../SeriesSeasonContent.module.scss";
import { useAppSelector } from "@/store";
import SeriesSeasonContentEpisode from "./SeriesSeasonContentEpisode/SeriesSeasonContentEpisode";

const SeriesSeasonContentEpisodes = () => {
  const { details, season } = useAppSelector((state) => state.series);
  const seasonEpisodesSectionHeader = `LIST OF EPISODES (${season?.episodes?.length})`;
  return (
    <section
      className={`${styles["series-season-content__episodes"]}`}
      aria-labelledby="series-season-content-episodes"
    >
      <h2
        id="series-season-content-episodes"
        className={`${styles["series-season-content__episodes-header"]} ${sectionStyles["series-season-content__section-header"]}`}
      >
        {seasonEpisodesSectionHeader}
      </h2>
      <ul className={styles["series-season-content__episodes-list"]}>
        {season?.episodes?.map((episode) => (
          <SeriesSeasonContentEpisode key={episode.name} {...episode} />
        ))}
      </ul>
    </section>
  );
};

export default SeriesSeasonContentEpisodes;
