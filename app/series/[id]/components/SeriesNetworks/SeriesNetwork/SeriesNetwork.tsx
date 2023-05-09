"use client";

import React from "react";
import { SeriesNetworkType } from "@/types/types";
import styles from "../SeriesNetworks.module.scss";
import Image from "next/image";

const SeriesNetwork = ({ logo_path, name }: SeriesNetworkType) => {
  return (
    <li className={styles["series-networks__list-item"]}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${logo_path}`}
        alt={name}
        width={30}
        height={30}
      />
    </li>
  );
};

export default SeriesNetwork;
