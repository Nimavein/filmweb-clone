import React from "react";
import { useAppSelector } from "@/store";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import styles from "./VodPageContentTvSeries.module.scss";
import sectionStyles from "../VodPageContent.module.scss";
import VodPageContentSeries from "./VodPageContentSeries/VodPageContentSeries";

const VodPageContentTvSeries = () => {
  const { watchProviderTvSeries } = useAppSelector((state) => state.tvSeries);

  return (
    <section
      className={`${styles["vod-page-content__tv-series"]} ${sectionStyles["vod-page-content__section"]} `}
    >
      <h2 className={sectionStyles["vod-page-content__section-header"]}>AVAILABLE TV SERIES</h2>
      <Carousel
        slidesToShow={4}
        arrows
        nextArrow={<RightOutlined />}
        prevArrow={<LeftOutlined />}
        dots={false}
        infinite={false}
      >
        {watchProviderTvSeries?.results?.map((series) => (
          <VodPageContentSeries key={series.id} {...series} />
        ))}
      </Carousel>
    </section>
  );
};

export default VodPageContentTvSeries;
