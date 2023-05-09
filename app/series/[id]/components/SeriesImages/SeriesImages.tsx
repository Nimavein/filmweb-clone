"use client";

import React from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesImages.module.scss";
import sectionStyles from "../Series.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import SeriesContentImage from "./SeriesImage/SeriesImage";

const SeriesImages = () => {
  const details = useAppSelector((state) => state.series.details);
  const images = details?.images;
  const displayedImagesAmount = 12;

  const imagesSectionHeader =
    `Images of the series ${details?.name} (${images?.backdrops?.length})`.toUpperCase();

  return (
    <section
      className={`${styles["series-images"]} ${sectionStyles["series-section"]}`}
      aria-labelledby="series-images"
    >
      <h2
        id="series-images"
        className={`${styles["series-images__header"]} ${sectionStyles["series-section__header"]}`}
      >
        {imagesSectionHeader}
      </h2>
      <ul className={styles["series-images__list"]}>
        {images?.backdrops?.slice(0, displayedImagesAmount)?.map((image) => (
          <li key={image.file_path} className={styles["series-images__list-item"]}>
            <SeriesContentImage {...image} />
          </li>
        ))}
      </ul>
      <Link href={`/series/${details?.id}/images`}>
        <Button>{`See all ${images?.backdrops?.length} images`}</Button>
      </Link>
    </section>
  );
};

export default SeriesImages;
