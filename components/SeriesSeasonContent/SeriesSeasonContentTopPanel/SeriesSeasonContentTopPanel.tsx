import React from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesSeasonContentTopPanel.module.scss";
import Link from "next/link";
import { Divider } from "antd";
import { CameraOutlined, CaretRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";

const SeriesSeasonContentTopPanel = () => {
  const { details, season } = useAppSelector((state) => state.series);
  const imageWidth = 100;
  const imageHeight = imageWidth * 1.5;
  return (
    <section className={styles["series-season-content__top-panel"]}>
      <div className={styles["series-season-content__top-panel-breadcrumb"]}>
        <Link href={`/series/${details?.id}`}>
          <span className={styles["series-season-content__top-panel-breadcrumb-name"]}>{`${
            details?.name
          } (${details?.first_air_date?.substring(0, 4)} ${
            details?.last_air_date && ` - ${details?.last_air_date?.substring(0, 4)})`
          }`}</span>
        </Link>
        <CaretRightOutlined />
        <span className={styles["series-season-content__top-panel-breadcrumb-season"]}>
          {season?.name}
        </span>
      </div>
      <Divider style={{ background: "gray" }} />
      <div className={styles["series-season-content__top-panel-info"]}>
        {season?.poster_path ? (
          <Image
            alt=""
            width={imageWidth}
            height={imageHeight}
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${season?.poster_path}`}
          />
        ) : (
          <ImagePlaceholder width={imageWidth} height={imageHeight} icon={<CameraOutlined />} />
        )}
        <div className={styles["series-season-content__top-panel-info-text"]}>
          <h1
            className={styles["series-season-content__top-panel-info-name"]}
          >{`${season?.name}: ${details?.name}`}</h1>
          <div className={styles["series-season-content__top-panel-info-description"]}>
            {season?.air_date && (
              <span className={styles["series-season-content__top-panel-info-release"]}>
                {season?.air_date}
              </span>
            )}
            {season?.episodes && (
              <span className={styles["series-season-content__top-panel-info-episodes"]}>
                {`${season?.episodes?.length} episodes`}
              </span>
            )}
          </div>
          {season?.overview && (
            <span className={styles["series-season-content__top-panel-info-overview"]}>
              {season.overview}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default SeriesSeasonContentTopPanel;
