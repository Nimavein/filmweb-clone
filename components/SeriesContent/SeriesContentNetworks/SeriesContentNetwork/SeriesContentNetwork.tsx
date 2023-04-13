import React from "react";
import { SeriesNetwork } from "@/types/types";
import styles from "../SeriesContentNetworks.module.scss";
import Image from "next/image";

const SeriesContentNetwork = ({ logo_path, name }: SeriesNetwork) => {
  return (
    <li className={styles["series-content__networks-list-item"]}>
      <Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${logo_path}`} alt="" width={30} height={30} />
      <span className={styles["series-content__networks-list-item-name"]}>{name}</span>
    </li>
  );
};

export default SeriesContentNetwork;
