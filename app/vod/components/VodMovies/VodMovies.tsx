"use client";

import React from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import styles from "./VodMovies.module.scss";
import sectionStyles from "../../Vod.module.scss";
import VodMovie from "./VodMovie/VodMovie";
import { Movies } from "@/types/types";

interface VodMoviesProps {
  watchProviderMovies: Movies;
}

const VodMovies = ({ watchProviderMovies }: VodMoviesProps) => {
  return (
    <section
      className={`${styles["vod-movies"]} ${sectionStyles["vod-section"]} `}
    >
      <h2 className={sectionStyles["vod-section__header"]}>AVAILABLE MOVIES</h2>
      <Carousel
        slidesToShow={4}
        arrows
        nextArrow={<RightOutlined />}
        prevArrow={<LeftOutlined />}
        dots={false}
        infinite={false}
      >
        {watchProviderMovies?.results?.map((movie) => (
          <VodMovie key={movie.id} {...movie} />
        ))}
      </Carousel>
    </section>
  );
};

export default VodMovies;
