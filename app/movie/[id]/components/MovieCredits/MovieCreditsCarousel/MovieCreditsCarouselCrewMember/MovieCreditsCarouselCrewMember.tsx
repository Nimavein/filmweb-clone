import React from "react";
import { CrewMember } from "@/types/types";
import Image from "next/image";
import styles from "../MovieCreditsCarousel.module.scss";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";

const MovieCreditsCarouselCrewMember = ({
  name,
  profile_path,
  job,
  id,
}: CrewMember) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link href={`/person/${id}`}>
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
          <ImagePlaceholder width={imageWidth} height={imageHeight} />
        )}
        <p className={styles["credits-carousel__person-name"]}>{name}</p>
        <p className={styles["credits-carousel__person-character"]}>{job}</p>
      </div>
    </Link>
  );
};

export default MovieCreditsCarouselCrewMember;
