import React from "react";
import { Movie } from "@/types/types";
import Link from "next/link";
import styles from "../VodPageContentMovies.module.scss";
import { CameraOutlined } from "@ant-design/icons";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";

const VodPageContentMovie = ({ title, id, poster_path }: Movie) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link href={`/movie/${id}`}>
      <div className={styles["vod-page-content__movie"]}>
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
        <p className={styles["vod-page-content__movie-title"]}>{title}</p>
      </div>
    </Link>
  );
};

export default VodPageContentMovie;
