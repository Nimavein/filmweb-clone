import React from "react";
import { MediaType, Movies, TvSeries } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import Carousel from "@/components/Carousel/Carousel";
import { CarouselProps } from "antd";
import getName from "@/helpers/getName";
import getMediaHref from "@/helpers/getHref";

import styles from "./MediaCarousel.module.scss";

type MediaCarouselProps = {
  medias: TvSeries | Movies;
  mediaType: MediaType;
  title?: string;
} & CarouselProps;

const baseCSSClassName = "media-carousel";

const MediaCarousel = ({
  medias,
  mediaType,
  title,
  ...props
}: MediaCarouselProps) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;

  return (
    medias?.total_results > 0 && (
      <div>
        {title && (
          <h2 className={styles[`${baseCSSClassName}__title`]}>{title}</h2>
        )}
        <Carousel {...props} className={styles[baseCSSClassName]}>
          {medias?.results?.map((media, index) => (
            <Link
              key={index}
              href={getMediaHref(mediaType, getName(media), media.id)}
            >
              <div className={styles[`${baseCSSClassName}__slide`]}>
                {media?.poster_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${media?.poster_path}`}
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
                  className={styles[`${baseCSSClassName}__slide-title`]}
                  style={{ maxWidth: imageWidth }}
                >
                  {`${getName(media)} (${
                    "release_date" in media
                      ? media?.release_date?.slice(0, 4)
                      : "first_air_date" in media &&
                        media.first_air_date?.slice(0, 4)
                  })`}
                </p>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    )
  );
};

export default MediaCarousel;
