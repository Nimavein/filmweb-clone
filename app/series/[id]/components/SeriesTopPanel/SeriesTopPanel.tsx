"use client";

import React from "react";
import styles from "./SeriesTopPanel.module.scss";
import Image from "next/image";
import Rating from "@/components/Rating/Rating";
import { useAppSelector } from "@/store";

const SeriesTopPanel = () => {
  const { details } = useAppSelector((state) => state.series);

  return (
    <section className={styles["series-top-panel"]}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${details?.backdrop_path}`}
        alt=""
        fill
        className={styles["series-top-panel__banner"]}
        quality={100}
      />
      <div className={styles["series-top-panel__details"]}>
        <h1 className={styles["series-top-panel__title"]}>{details?.name}</h1>
        <div className={styles["series-top-panel__wrapper"]}>
          <span className={styles["series-top-panel__title-original"]}>
            {details?.original_name}
          </span>
          <span className={styles["series-top-panel__release"]}>
            {`${details?.first_air_date?.substring(0, 4)} ${
              details?.last_air_date && ` - ${details?.last_air_date?.substring(0, 4)}`
            }`}
          </span>
          <span className={styles["series-top-panel__runtime"]}>
            {`${details?.episode_run_time} minutes`}
          </span>
        </div>
        <div className={styles["series-top-panel__rating"]}>
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

export default SeriesTopPanel;
