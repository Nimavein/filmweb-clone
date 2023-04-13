import React from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesContentNetworks.module.scss";
import SeriesContentNetwork from "./SeriesContentNetwork/SeriesContentNetwork";

const SeriesContentNetworks = () => {
  const { details } = useAppSelector((state) => state.series);

  return (
    <div className={styles["series-content__networks"]}>
      <p className={styles["series-content__networks-header"]}>Networks: </p>
      <ul className={styles["series-content__networks-list"]}>
        {details?.networks?.map((network, index) => (
          <SeriesContentNetwork key={index} {...network} />
        ))}
      </ul>
    </div>
  );
};

export default SeriesContentNetworks;
