import React from "react";
import styles from "./SeriesNetworks.module.scss";
import SeriesNetwork from "./SeriesNetwork/SeriesNetwork";
import { SeriesNetworkType } from "@/types/types";

interface SeriesNetworksProps {
  seriesNetworks: SeriesNetworkType[];
}

const SeriesNetworks = ({ seriesNetworks }: SeriesNetworksProps) => {
  return (
    <div className={styles["series-networks"]}>
      <p className={styles["series-networks__header"]}>Available on: </p>
      <ul className={styles["series-networks__list"]}>
        {seriesNetworks?.map((network, index) => (
          <SeriesNetwork key={index} {...network} />
        ))}
      </ul>
    </div>
  );
};

export default SeriesNetworks;
