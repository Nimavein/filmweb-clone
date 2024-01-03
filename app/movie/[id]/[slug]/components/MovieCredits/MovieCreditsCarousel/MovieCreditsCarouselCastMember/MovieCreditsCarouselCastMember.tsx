import React from "react";
import { CastMember } from "@/types/types";
import Image from "next/image";
import styles from "../MovieCreditsCarousel.module.scss";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import getHref from "@/helpers/getHref";

const MovieCreditsCarouselCastMember = ({
  name,
  profile_path,
  character,
  id,
}: CastMember) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link href={getHref("person", name, id)}>
      <div className={styles["credits-carousel__person"]}>
        {profile_path ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${profile_path}`}
            alt=""
            height={imageHeight}
            width={imageWidth}
            className={styles["credits-carousel__person-image"]}
          />
        ) : (
          <ImagePlaceholder
            width={imageWidth}
            height={imageHeight}
            type="person"
          />
        )}
        <p className={styles["credits-carousel__person-name"]}>{name}</p>
        <p className={styles["credits-carousel__person-character"]}>
          {character}
        </p>
      </div>
    </Link>
  );
};

export default MovieCreditsCarouselCastMember;
