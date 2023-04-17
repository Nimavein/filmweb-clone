import React from "react";
import { SeriesNetwork } from "@/types/types";
import styles from "../SeriesContentNetworks.module.scss";
import Image from "next/image";

const SeriesContentNetwork = ({ logo_path, name }: SeriesNetwork) => {
  return (
    <li className={styles["series-content__networks-list-item"]}>
      <Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${logo_path}`} alt={name} width={30} height={30} />
    </li>
  );
};

export default SeriesContentNetwork;
