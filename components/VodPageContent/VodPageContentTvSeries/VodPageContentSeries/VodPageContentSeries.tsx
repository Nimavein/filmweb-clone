import React from "react";
import Link from "next/link";
import styles from "../VodPageContentTvSeries.module.scss";
import { CameraOutlined } from "@ant-design/icons";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import { Series } from "@/types/types";

const VodPageContentSeries = ({ name, id, poster_path }: Series) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link href={`/series/${id}`}>
      <div className={styles["vod-page-content__series"]}>
        {poster_path ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
            alt=""
            height={imageHeight}
            width={imageWidth}
          />
        ) : (
          <ImagePlaceholder width={imageWidth} height={imageHeight} icon={<CameraOutlined />} />
        )}
        <p className={styles["vod-page-content__series-title"]}>{name}</p>
      </div>
    </Link>
  );
};

export default VodPageContentSeries;
