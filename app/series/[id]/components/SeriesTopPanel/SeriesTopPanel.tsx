import React from "react";
import styles from "./SeriesTopPanel.module.scss";
import Image from "next/image";
import Rating from "@/components/Rating/Rating";
import { SeriesDetails } from "@/types/types";
import RateMedia from "@/components/RateMedia/RateMedia";

interface SeriesTopPanelProps {
  seriesDetails: SeriesDetails;
}

const SeriesTopPanel = ({
  seriesDetails: {
    backdrop_path,
    name,
    original_name,
    first_air_date,
    last_air_date,
    episode_run_time,
    vote_average,
    vote_count,
    id,
  },
}: SeriesTopPanelProps) => {
  return (
    <section className={styles["series-top-panel"]}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${backdrop_path}`}
        alt=""
        fill
        className={styles["series-top-panel__banner"]}
        quality={100}
      />
      <div className={styles["series-top-panel__rate--desktop"]}>
        <RateMedia mediaType="tv" mediaId={id} />
      </div>
      <div className={styles["series-top-panel__details"]}>
        <h1 className={styles["series-top-panel__title"]}>{name}</h1>
        <div className={styles["series-top-panel__wrapper"]}>
          <span className={styles["series-top-panel__title-original"]}>{original_name}</span>
          <span className={styles["series-top-panel__release"]}>
            {`${first_air_date?.substring(0, 4)} ${
              last_air_date && ` - ${last_air_date?.substring(0, 4)}`
            }`}
          </span>
          <span className={styles["series-top-panel__runtime"]}>
            {`${episode_run_time} minutes`}
          </span>
        </div>
        <div className={styles["series-top-panel__rating"]}>
          <Rating
            fontSize={24}
            small
            defaultValue={vote_average ? parseFloat(vote_average.toFixed(2)) : 0}
            voteCount={vote_count}
          />
        </div>
      </div>
    </section>
  );
};

export default SeriesTopPanel;
