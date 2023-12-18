import React from "react";
import {
  MediaType,
  PersonMovieCast,
  PersonMovieCrew,
  PersonTvCast,
  PersonTvCrew,
} from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import styles from "../PersonCredits.module.scss";
import Carousel from "@/components/Carousel/Carousel";
import getName from "@/helpers/getName";
import getMediaHref from "@/helpers/getMediaHref";

interface PersonCreditsCarouselProps {
  credits:
    | PersonMovieCast
    | PersonMovieCrew
    | PersonTvCast
    | PersonTvCrew
    | undefined;
  mediaType: MediaType;
}

const PersonCreditsCarousel = ({
  credits,
  mediaType,
}: PersonCreditsCarouselProps) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;

  return credits ? (
    <Carousel>
      {credits?.map((credit, index) => (
        <Link key={index} href={getMediaHref(mediaType, credit.id)}>
          <div className={styles["person-credits__slide"]}>
            {credit?.poster_path ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${credit?.poster_path}`}
                alt=""
                height={imageHeight}
                width={imageWidth}
              />
            ) : (
              <ImagePlaceholder
                key={index}
                height={imageHeight}
                width={imageWidth}
                type="person"
              />
            )}
            <p
              className={styles["person-credits__slide-title"]}
              style={{ maxWidth: imageWidth }}
            >
              {`${getName(credit)} (${
                "release_date" in credit
                  ? credit?.release_date?.slice(0, 4)
                  : "first_air_date" in credit &&
                    credit.first_air_date?.slice(0, 4)
              })`}
            </p>
            {"job" in credit && credit.job && (
              <p className={styles["person-credits__slide-job"]}>
                {credit.job}
              </p>
            )}
            {"character" in credit && credit.character && (
              <p className={styles["person-credits__slide-character"]}>
                {credit.character}
              </p>
            )}
          </div>
        </Link>
      ))}
    </Carousel>
  ) : (
    <></>
  );
};

export default PersonCreditsCarousel;
