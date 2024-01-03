import React from "react";
import styles from "./SeriesImages.module.scss";
import sectionStyles from "../../Series.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { SeriesDetails } from "@/types/types";
import Image from "next/image";
import getHref from "@/helpers/getHref";

interface SeriesImagesProps {
  seriesDetails: SeriesDetails;
}

const SeriesImages = ({
  seriesDetails: { images, id, name },
}: SeriesImagesProps) => {
  const displayedImagesAmount = 12;

  const imagesSectionHeader =
    `Images of the series ${name} (${images?.backdrops?.length})`.toUpperCase();

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
        {images?.backdrops?.slice(0, displayedImagesAmount)?.map(
          (image) =>
            image.aspect_ratio &&
            image.file_path && (
              <li
                key={image.file_path}
                className={styles["series-images__list-item"]}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image.file_path}`}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </li>
            )
        )}
      </ul>
      <Link href={`${getHref("tv", name, id)}images`}>
        <Button>{`See all ${images?.backdrops?.length} images`}</Button>
      </Link>
    </section>
  );
};

export default SeriesImages;
