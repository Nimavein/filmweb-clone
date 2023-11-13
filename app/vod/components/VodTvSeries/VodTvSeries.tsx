"use client";

import React from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import styles from "./VodTvSeries.module.scss";
import sectionStyles from "../../Vod.module.scss";
import VodSeries from "./VodSeries/VodSeries";
import { TvSeries } from "@/types/types";

interface VodTvSeriesProps {
  watchProviderTvSeries: TvSeries;
}

const VodTvSeries = ({ watchProviderTvSeries }: VodTvSeriesProps) => {
  return (
    <section
      className={`${styles["vod-tv-series"]} ${sectionStyles["vod-section"]} `}
    >
      <h2 className={sectionStyles["vod-section__header"]}>
        AVAILABLE TV SERIES
      </h2>
      <Carousel
        slidesToShow={4}
        arrows
        nextArrow={<RightOutlined />}
        prevArrow={<LeftOutlined />}
        dots={false}
        infinite={false}
      >
        {watchProviderTvSeries?.results?.map((series) => (
          <VodSeries key={series.id} {...series} />
        ))}
      </Carousel>
    </section>
  );
};

export default VodTvSeries;
