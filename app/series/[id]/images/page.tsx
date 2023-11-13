import React from "react";
import { PageIdParams } from "@/types/types";

import styles from "./SeriesImages.module.scss";
import { getSeriesData } from "@/api";
import SeriesImage from "./components/SeriesImage/SeriesImage";

const SeriesImages = async ({ params: { id } }: PageIdParams) => {
  const numberId = Number(id);
  const seriesData = await getSeriesData(numberId);
  const seriesDetails = seriesData?.seriesDetails;
  const seriesImages = seriesDetails?.images;

  return (
    <main className={styles["series-images"]}>
      <h1
        className={styles["series-images__title"]}
      >{`Images of ${seriesDetails?.name} (${seriesImages?.backdrops?.length})`}</h1>
      <ul className={styles["series-images__list"]}>
        {seriesImages?.backdrops?.map(
          (image) =>
            image.aspect_ratio &&
            image.file_path && (
              <li
                key={image.file_path}
                className={styles["series-images__list-item"]}
              >
                <SeriesImage {...image} />
              </li>
            )
        )}
      </ul>
    </main>
  );
};

export default SeriesImages;
