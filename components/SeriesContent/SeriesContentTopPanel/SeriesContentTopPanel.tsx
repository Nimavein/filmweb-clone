import React from "react";
import styles from "./SeriesContentTopPanel.module.scss";
import Image from "next/image";
import Rating from "@/components/Rating/Rating";
import { useAppSelector } from "@/store";

const SeriesContentTopPanel = () => {
  const { details } = useAppSelector((state) => state.series);

  return (
    <section className={styles["series-content__top-panel"]}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${details?.backdrop_path}`}
        alt=""
        fill
        className={styles["series-content__top-panel-banner"]}
        quality={100}
      />
      <div className={styles["series-content__top-panel-details"]}>
        <h1 className={styles["series-content__top-panel-title"]}>{details?.name}</h1>
        <div className={styles["series-content__top-panel-wrapper"]}>
          <span className={styles["series-content__top-panel-title-original"]}>
            {details?.original_name}
          </span>
          <span className={styles["series-content__top-panel-release"]}>
            {`${details?.first_air_date?.substring(0, 4)} ${
              details?.last_air_date && ` - ${details?.last_air_date?.substring(0, 4)}`
            }`}
          </span>
          <span className={styles["series-content__top-panel-runtime"]}>
            {`${details?.episode_run_time} minutes`}
          </span>
        </div>
        <div className={styles["series-content__top-panel-rating"]}>
          <Rating
            fontSize={24}
            small
            defaultValue={details?.vote_average ? parseFloat(details?.vote_average.toFixed(2)) : 0}
            voteCount={details?.vote_count}
          />
        </div>
      </div>
    </section>
  );
};

export default SeriesContentTopPanel;
