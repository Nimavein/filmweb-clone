import React from "react";
import Link from "next/link";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import { SeasonDetails, SeriesDetails } from "@/types/types";
import Divider from "@/components/Divider/Divider";
import getHref from "@/helpers/getHref";

import styles from "./SeriesSeasonContentTopPanel.module.scss";

interface SeriesSeasonContentTopPanelProps {
  seriesDetails: SeriesDetails;
  seasonDetails: SeasonDetails;
}

const SeriesSeasonContentTopPanel = ({
  seriesDetails,
  seasonDetails,
}: SeriesSeasonContentTopPanelProps) => {
  const imageWidth = 100;
  const imageHeight = imageWidth * 1.5;
  return (
    <section className={styles["series-season-content__top-panel"]}>
      <div className={styles["series-season-content__top-panel-breadcrumb"]}>
        <Link href={getHref("tv", seriesDetails.name, seriesDetails.id)}>
          <span
            className={
              styles["series-season-content__top-panel-breadcrumb-name"]
            }
          >{`${seriesDetails?.name} (${seriesDetails?.first_air_date?.substring(
            0,
            4
          )} ${
            seriesDetails?.last_air_date &&
            ` - ${seriesDetails?.last_air_date?.substring(0, 4)})`
          }`}</span>
        </Link>
        <span>{">"}</span>
        <span
          className={
            styles["series-season-content__top-panel-breadcrumb-season"]
          }
        >
          {seasonDetails?.name}
        </span>
      </div>
      <Divider />
      <div className={styles["series-season-content__top-panel-info"]}>
        {seasonDetails?.poster_path ? (
          <Image
            alt=""
            width={imageWidth}
            height={imageHeight}
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${seasonDetails?.poster_path}`}
          />
        ) : (
          <ImagePlaceholder
            width={imageWidth}
            height={imageHeight}
            type="image"
          />
        )}
        <div className={styles["series-season-content__top-panel-info-text"]}>
          <h1
            className={styles["series-season-content__top-panel-info-name"]}
          >{`${seasonDetails?.name}: ${seriesDetails?.name}`}</h1>
          <div
            className={
              styles["series-season-content__top-panel-info-description"]
            }
          >
            {seasonDetails?.air_date && (
              <span
                className={
                  styles["series-season-content__top-panel-info-release"]
                }
              >
                {seasonDetails?.air_date}
              </span>
            )}
            {seasonDetails?.episodes && (
              <span
                className={
                  styles["series-season-content__top-panel-info-episodes"]
                }
              >
                {`${seasonDetails?.episodes?.length} episodes`}
              </span>
            )}
          </div>
          {seasonDetails?.overview && (
            <span
              className={
                styles["series-season-content__top-panel-info-overview"]
              }
            >
              {seasonDetails.overview}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default SeriesSeasonContentTopPanel;
