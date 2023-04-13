import React from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesContentImages.module.scss";
import sectionStyles from "../SeriesContent.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import SeriesContentImage from "./SeriesContentImage/SeriesContentImage";

const SeriesContentImages = () => {
  const details = useAppSelector((state) => state.series.details);
  const images = details?.images;
  const displayedImagesAmount = 12;

  const imagesSectionHeader =
    `Images of the series ${details?.name} (${images?.backdrops?.length})`.toUpperCase();

  return (
    <section
      className={`${styles["series-content__images"]} ${sectionStyles["series-content__section"]}`}
      aria-labelledby="series-content-images"
    >
      <h2
        id="series-content-images"
        className={`${styles["series-content__images-header"]} ${sectionStyles["series-content__section-header"]}`}
      >
        {imagesSectionHeader}
      </h2>
      <ul className={styles["series-content__images-list"]}>
        {images?.backdrops?.slice(0, displayedImagesAmount)?.map((image) => (
          <li key={image.file_path} className={styles["series-content__images-list-item"]}>
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

export default SeriesContentImages;
