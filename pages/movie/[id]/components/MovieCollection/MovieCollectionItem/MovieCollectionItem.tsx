import React from "react";
import { Movie } from "@/types/types";
import Link from "next/link";
import styles from "../MovieCollection.module.scss";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";

const MovieCollectionItem = ({ title, id, poster_path, release_date }: Movie) => {
  const imageHeight = 120;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link className={styles["movie-collection__list-item"]} href={`/movie/${id}`}>
      {poster_path ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
          alt=""
          height={imageHeight}
          width={imageWidth}
        />
      ) : (
        <ImagePlaceholder width={imageWidth} height={imageHeight} />
      )}
      <p className={styles["movie-collection__list-item-title"]}>{title}</p>
      <p className={styles["movie-collection__list-item-release"]}>
        {`(${release_date.slice(0, 4)})`}
      </p>
    </Link>
  );
};

export default MovieCollectionItem;
