import React from "react";
import Image from "next/image";
import styles from "./MovieDescription.module.scss";
import sectionStyles from "../../Movie.module.scss";
import { findPeopleByJob } from "@/helpers/findPeopleByJob";
import { getGenresNames } from "@/helpers/getGenresNames";
import { getProductionCountries } from "@/helpers/getProductionCountries";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import { MovieDetails } from "@/types/types";
import RateMedia from "@/components/RateMedia/RateMedia";

interface MovieDetail {
  name: string;
  value: string | undefined;
}

interface MovieDescriptionProps {
  movieDetails: MovieDetails;
}

const MovieDescription = ({
  movieDetails: {
    credits,
    genres,
    production_countries,
    release_date,
    poster_path,
    overview,
    id
  },
}: MovieDescriptionProps) => {
  const imageHeight = 300;
  const imageWidth = imageHeight * 0.667;

  const details: MovieDetail[] = [
    { name: "Screenplay", value: findPeopleByJob("Screenplay", credits?.crew) },
    { name: "Genres", value: getGenresNames(genres) },
    {
      name: "Production",
      value: getProductionCountries(production_countries),
    },
    { name: "Release", value: release_date },
  ];

  return (
    <section className={`${styles["movie-description"]} ${sectionStyles["movie-section"]}`}>
      {poster_path ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
          alt=""
          width={imageWidth}
          height={imageHeight}
        />
      ) : (
        <ImagePlaceholder height={imageHeight} width={imageWidth} />
      )}
      <div className={styles["movie-description__info"]}>
        <p className={styles["movie-description__overview"]}>{overview}</p>
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
      <div className={styles["movie-description__rate--mobile"]}>
        <RateMedia mediaType="movie" mediaId={id} />
      </div>
    </section>
  );
};

export default MovieDescription;
