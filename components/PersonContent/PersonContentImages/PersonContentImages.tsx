import React from "react";
import styles from "./PersonContentImages.module.scss";
import sectionStyles from "../PersonContent.module.scss";
import { useAppSelector } from "@/store";
import Link from "next/link";
import Button from "@/components/Button/Button";
import PersonContentImage from "./PersonContentImage/PersonContentImage";

const PersonContentImages = () => {
  const { details, images } = useAppSelector((state) => state.person);

  const creditsSectionHeader =
    `Images of ${details?.name} (${images?.profiles?.length})`.toUpperCase();

  const displayedImagesAmount = 12;

  return (
    <section
      className={`${styles["person-content__images"]} ${sectionStyles["person-content__section"]}`}
      aria-labelledby="person-content-images"
    >
      <h2
        id="person-content-images"
        className={`${styles["person-content__images-header"]} ${sectionStyles["person-content__section-header"]}`}
      >
        {creditsSectionHeader}
      </h2>
      <ul className={styles["person-content__images-list"]}>
        {images?.profiles?.slice(0, displayedImagesAmount)?.map((image) => (
          <li key={image.file_path} className={styles["person-content__images-list-item"]}>
            <PersonContentImage {...image} />
          </li>
        ))}
      </ul>
      <Link href={`/person/${details?.id}/images`}>
        <Button>{`See all ${images?.profiles?.length} images`}</Button>
      </Link>
    </section>
  );
};

export default PersonContentImages;
