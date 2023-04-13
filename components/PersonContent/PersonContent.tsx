import React from "react";
import { useAppSelector } from "@/store";
import styles from "./PersonContent.module.scss";
import PersonContentDetails from "./PersonContentDetails/PersonContentDetails";
import PersonContentCredits from "./PersonContentCredits/PersonContentCredits";
import PersonContentImages from "./PersonContentImages/PersonContentImages";

const PersonContent = () => {
  const details = useAppSelector((state) => state.person.details);
  const tvCredits = details?.tv_credits;
  const movieCredits = details?.movie_credits;
  const images = details?.images;

  const areTvCreditsAvailable =
    (tvCredits?.cast && tvCredits?.cast?.length > 0) ||
    (tvCredits?.crew && tvCredits?.crew.length > 0);

  const areMovieCreditsAvailable =
    (movieCredits?.cast && movieCredits?.cast?.length > 0) ||
    (movieCredits?.crew && movieCredits?.crew?.length > 0);

  const areImagesAvailable = images?.profiles && images?.profiles?.length > 0;

  return (
    <main className={styles["person-content"]}>
      <PersonContentDetails />
      {areMovieCreditsAvailable && (
        <PersonContentCredits cast={movieCredits?.cast} crew={movieCredits?.crew} type="movies" />
      )}
      {areTvCreditsAvailable && (
        <PersonContentCredits cast={tvCredits?.cast} crew={tvCredits?.crew} type="tv-series" />
      )}
      {areImagesAvailable && <PersonContentImages />}
    </main>
  );
};

export default PersonContent;
