import React from "react";
import styles from "./VodMovies.module.scss";
import sectionStyles from "../../Vod.module.scss";
import VodMovie from "./VodMovie/VodMovie";
import { Movies } from "@/types/types";
import Carousel from "@/components/Carousel/Carousel";

interface VodMoviesProps {
  watchProviderMovies: Movies;
}

const VodMovies = ({ watchProviderMovies }: VodMoviesProps) => {
  return (
    <section
      className={`${styles["vod-movies"]} ${sectionStyles["vod-section"]} `}
    >
      <h2 className={sectionStyles["vod-section__header"]}>AVAILABLE MOVIES</h2>
      <Carousel>
        {watchProviderMovies?.results?.map((movie) => (
          <VodMovie key={movie.id} {...movie} />
        ))}
      </Carousel>
    </section>
  );
};

export default VodMovies;
