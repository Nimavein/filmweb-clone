import React from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesNetworks.module.scss";
import SeriesNetwork from "./SeriesNetwork/SeriesNetwork";

const SeriesNetworks = () => {
  const { details } = useAppSelector((state) => state.series);

  return (
    <div className={styles["series-networks"]}>
      <p className={styles["series-networks__header"]}>Available on: </p>
      <ul className={styles["series-networks__list"]}>
        {details?.networks?.map((network, index) => (
          <SeriesNetwork key={index} {...network} />
        ))}
      </ul>
    </div>
  );
};

export default SeriesNetworks;
