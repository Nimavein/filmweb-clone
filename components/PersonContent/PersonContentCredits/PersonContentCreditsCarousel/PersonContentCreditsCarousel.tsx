import React from "react";
import { PersonMovieCast, PersonMovieCrew, PersonTvCast, PersonTvCrew } from "@/types/types";
import { RightOutlined, LeftOutlined, CameraOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import styles from "../PersonContentCredits.module.scss";

interface PersonContentCreditsCarouselProps {
  credits: PersonMovieCast | PersonMovieCrew | PersonTvCast | PersonTvCrew | undefined;
  type: "movies" | "tv-series";
}

const PersonContentCreditsCarousel = ({ credits, type }: PersonContentCreditsCarouselProps) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;

  return credits ? (
    <Carousel
      slidesToShow={4}
      arrows
      nextArrow={<RightOutlined />}
      prevArrow={<LeftOutlined />}
      dots={false}
      infinite={false}
    >
      {credits?.map((credit, index) =>
        credit.poster_path ? (
          <Link key={index} href={`/${type === "movies" ? "movie" : "series"}/${credit.id}`}>
            <div className={styles["person-content__credits-slide"]}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${credit.poster_path}`}
                alt=""
                height={imageHeight}
                width={imageWidth}
              />
              <p
                className={styles["person-content__credits-slide-title"]}
                style={{ maxWidth: imageWidth }}
              >
                {`${"title" in credit ? credit.title : "name" in credit && credit.name} (${
                  "release_date" in credit
                    ? credit?.release_date?.slice(0, 4)
                    : "first_air_date" in credit && credit.first_air_date?.slice(0, 4)
                })`}
              </p>
              {"job" in credit && credit.job && (
                <p className={styles["person-content__credits-slide-job"]}>{credit.job}</p>
              )}
              {"character" in credit && credit.character && (
                <p className={styles["person-content__credits-slide-character"]}>
                  {credit.character}
                </p>
              )}
            </div>
          </Link>
        ) : (
          <ImagePlaceholder key={index} height={imageHeight} width={imageWidth} icon={<CameraOutlined />} />
        )
      )}
    </Carousel>
  ) : (
    <></>
  );
};

export default PersonContentCreditsCarousel;
