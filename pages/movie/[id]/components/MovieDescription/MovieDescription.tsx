import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/store";
import styles from "./MovieDescription.module.scss";
import { findPeopleByJob } from "@/helpers/findPeopleByJob";
import { getGenresNames } from "@/helpers/getGenresNames";
import { getProductionCountries } from "@/helpers/getProductionCountries";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import { CameraOutlined } from "@ant-design/icons";

interface MovieDetail {
  name: string;
  value: string | undefined;
}

const MovieDescription = () => {
  const movieDetails = useAppSelector((state) => state.movie.movieDetails);
  const credits = movieDetails?.credits;
  const imageHeight = 300;
  const imageWidth = imageHeight * 0.667;

  const details: MovieDetail[] = [
    { name: "Screenplay", value: findPeopleByJob("Screenplay", credits?.crew) },
    { name: "Genres", value: getGenresNames(movieDetails?.genres) },
    {
      name: "Production",
      value: getProductionCountries(movieDetails?.production_countries),
    },
    { name: "Release", value: movieDetails?.release_date },
  ];

  return (
    <section className={styles["movie-description"]}>
      {movieDetails?.poster_path ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movieDetails?.poster_path}`}
          alt=""
          width={imageWidth}
          height={imageHeight}
        />
      ) : (
        <ImagePlaceholder height={imageHeight} width={imageWidth} icon={<CameraOutlined />} />
      )}
      <div className={styles["movie-description__info"]}>
        <p className={styles["movie-description__overview"]}>{movieDetails?.overview}</p>
        <div className={styles["movie-description__details"]}>
          {details.map(
            (detail) =>
              detail?.value && (
                <div className={styles["movie-description__detail"]} key={detail.name}>
                  <p className={styles["movie-description__detail-name"]}>{detail.name}</p>
                  <p className={styles["movie-description__detail-value"]}>{detail.value}</p>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieDescription;
