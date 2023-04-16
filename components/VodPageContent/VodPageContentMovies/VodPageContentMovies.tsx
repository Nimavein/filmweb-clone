import React from "react";
import { useAppSelector } from "@/store";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import VodPageContentMovie from "./VodPageContentMovie/VodPageContentMovie";
import styles from "./VodPageContentMovies.module.scss";
import sectionStyles from "../VodPageContent.module.scss";

const VodPageContentMovies = () => {
  const { watchProviderMovies } = useAppSelector((state) => state.movies);

  return (
    <section
      className={`${styles["vod-page-content__movies"]} ${sectionStyles["vod-page-content__section"]} `}
    >
      <h2 className={sectionStyles["vod-page-content__section-header"]}>AVAILABLE MOVIES</h2>
      <Carousel
        slidesToShow={4}
        arrows
        nextArrow={<RightOutlined />}
        prevArrow={<LeftOutlined />}
        dots={false}
        infinite={false}
      >
        {watchProviderMovies?.results?.map((movie) => (
          <VodPageContentMovie key={movie.id} {...movie} />
        ))}
      </Carousel>
    </section>
  );
};

export default VodPageContentMovies;
