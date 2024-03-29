import React from "react";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import styles from "../SeriesCredits.module.scss";
import {
  SeriesAggregateCreditsCast,
  SeriesAggregateCreditsCrew,
} from "@/types/types";
import Carousel from "@/components/Carousel/Carousel";
import getHref from "@/helpers/getHref";

interface SeriesCreditsCarouselProps {
  credits: SeriesAggregateCreditsCast | SeriesAggregateCreditsCrew | undefined;
}

const SeriesCreditsCarousel = ({ credits }: SeriesCreditsCarouselProps) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;

  return credits ? (
    <Carousel>
      {credits?.map((credit, index) => (
        <Link key={index} href={getHref("person", credit.name, credit.id)}>
          <div className={styles["series-credits__slide"]}>
            {credit?.profile_path ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${credit?.profile_path}`}
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
              className={styles["series-credits__slide-title"]}
              style={{ maxWidth: imageWidth }}
            >
              {credit.name}
            </p>
            {"jobs" in credit && credit.jobs && (
              <p className={styles["series-credits__slide-job"]}>
                {credit.jobs?.map((job) => job.job).join(", ")}
              </p>
            )}
            {"roles" in credit && credit.roles && (
              <p className={styles["series-credits__slide-character"]}>
                {credit.roles?.map((role) => role.character).join(", ")}
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

export default SeriesCreditsCarousel;
