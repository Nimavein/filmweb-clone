import React from "react";
import { useAppSelector } from "@/store";
import styles from "./PersonContent.module.scss";
import PersonContentDetails from "./PersonContentDetails/PersonContentDetails";
import PersonContentCredits from "./PersonContentCredits/PersonContentCredits";

const PersonContent = () => {
  const { details, movieCredits, tvCredits } = useAppSelector((state) => state.person);
  const isTvCredits =
    (tvCredits?.cast && tvCredits?.cast?.length > 0) ||
    (tvCredits?.crew && tvCredits?.crew.length > 0);
    
  const isMovieCredits =
    (movieCredits?.cast && movieCredits?.cast?.length > 0) ||
    (movieCredits?.crew && movieCredits?.crew?.length > 0);

  return (
    <main className={styles["person-content"]}>
      <PersonContentDetails />
      {isMovieCredits && (
        <PersonContentCredits cast={movieCredits?.cast} crew={movieCredits?.crew} type="movies" />
      )}
      {isTvCredits && (
        <PersonContentCredits cast={tvCredits?.cast} crew={tvCredits?.crew} type="tv-series" />
      )}
    </main>
  );
};

export default PersonContent;
