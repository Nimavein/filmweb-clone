import React from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesImagesList.module.scss";
import SeriesImagesListItem from "./SeriesImagesListItem/SeriesImagesListItem";

const SeriesImagesList = () => {
  const details = useAppSelector((state) => state.series.details);
  const images = details?.images;

  return (
    <section className={styles["series-images"]}>
      <h1
        className={styles["series-images__title"]}
      >{`Images of ${details?.name} (${images?.backdrops?.length})`}</h1>
      <ul className={styles["series-images__list"]}>
        {images?.backdrops?.map((image) => (
          <li
            key={image.file_path}
            className={styles["series-images__list-item"]}
          >
            <SeriesImagesListItem {...image} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SeriesImagesList;
