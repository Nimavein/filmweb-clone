import React from "react";
import Link from "next/link";
import styles from "./VodSeries.module.scss";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import { Series } from "@/types/types";

const VodSeries = ({ name, id, poster_path }: Series) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link href={`/series/${id}`}>
      <div className={styles["vod-series"]}>
        {poster_path ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
            alt=""
            height={imageHeight}
            width={imageWidth}
          />
        ) : (
          <ImagePlaceholder
            width={imageWidth}
            height={imageHeight}
            type="image"
          />
        )}
        <p className={styles["vod-series__title"]}>{name}</p>
      </div>
    </Link>
  );
};

export default VodSeries;
