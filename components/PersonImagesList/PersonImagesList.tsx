import React from "react";
import { useAppSelector } from "@/store";
import styles from "./PersonImagesList.module.scss";
import PersonImagesListItem from "./PersonImagesListItem/PersonImagesListItem";

const PersonImagesList = () => {
  const { images, details } = useAppSelector((state) => state.person);

  return (
    <section className={styles["person-images"]}>
      <h1 className={styles["person-images__title"]}>{`Images of ${details?.name}`}</h1>
      <ul className={styles["person-images__list"]}>
        {images?.profiles?.map((image) => (
          <li key={image.file_path} className={styles["person-images__list-item"]}>
            <PersonImagesListItem {...image} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PersonImagesList;
