import React from "react";
import styles from "./PersonImages.module.scss";
import sectionStyles from "../../Person.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { PersonDetails } from "@/types/types";
import Image from "next/image";

interface PersonImagesProps {
  personDetails: PersonDetails;
}

const PersonImages = ({ personDetails }: PersonImagesProps) => {
  const images = personDetails?.images;

  const creditsSectionHeader =
    `Images of ${personDetails?.name} (${images?.profiles?.length})`.toUpperCase();

  const displayedImagesAmount = 12;

  return (
    <section
      className={`${styles["person-images"]} ${sectionStyles["person-section"]}`}
      aria-labelledby="person-images"
    >
      <h2
        id="person-images"
        className={`${styles["person-images__header"]} ${sectionStyles["person-section__header"]}`}
      >
        {creditsSectionHeader}
      </h2>
      <ul className={styles["person-images__list"]}>
        {images?.profiles?.slice(0, displayedImagesAmount)?.map(
          (image) =>
            image.aspect_ratio &&
            image.file_path && (
              <li
                key={image.file_path}
                className={styles["person-images__list-item"]}
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
      <Link href={`/person/${personDetails?.id}/images`}>
        <Button>{`See all ${images?.profiles?.length} images`}</Button>
      </Link>
    </section>
  );
};

export default PersonImages;
