"use client";

import React from "react";
import { NetworkImagesDTO, SeriesNetworkType } from "@/types/types";
import styles from "../SeriesNetworks.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { networkApi } from "@/apiHelpers/urlHelper";

const SeriesNetwork = ({ name, id }: SeriesNetworkType) => {
  const { data: networkImagesData } = useSWR<NetworkImagesDTO>(
    id ? networkApi.getNetworkImages(id) : null
  );
  const networkImages = networkImagesData?.logos;
  const image = networkImages?.[0];
  return (
    image?.file_path && (
      <li className={styles["series-networks__list-item"]}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image?.file_path}`}
          alt={name}
          width={30 * (image?.aspect_ratio || 1)}
          height={30}
        />
      </li>
    )
  );
};

export default SeriesNetwork;
