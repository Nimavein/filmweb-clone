import React from "react";
import styles from "./SeriesSeasonContentEpisodes.module.scss";
import sectionStyles from "../../SeriesSeason.module.scss";
import SeriesSeasonContentEpisode from "./SeriesSeasonContentEpisode/SeriesSeasonContentEpisode";
import { SeasonDetails } from "@/types/types";

interface SeriesSeasonContentEpisodesProps {
  seasonDetails: SeasonDetails;
}

const SeriesSeasonContentEpisodes = ({
  seasonDetails,
}: SeriesSeasonContentEpisodesProps) => {
  const seasonEpisodesSectionHeader = `LIST OF EPISODES (${seasonDetails?.episodes?.length})`;
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
        {seasonDetails?.episodes?.map((episode) => (
          <SeriesSeasonContentEpisode key={episode.name} {...episode} />
        ))}
      </ul>
    </section>
  );
};

export default SeriesSeasonContentEpisodes;
