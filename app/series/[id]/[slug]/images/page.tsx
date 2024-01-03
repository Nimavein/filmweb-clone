import React from "react";
import { PageIdParams } from "@/types/types";
import { getSeriesData } from "@/apiHelpers";
import Image from "next/image";

import styles from "./SeriesImages.module.scss";

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
    </main>
  );
};

export default SeriesImages;
