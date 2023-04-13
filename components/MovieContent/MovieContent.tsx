import React, { useEffect } from "react";
import styles from "./MovieContent.module.scss";
import MovieContentTopPanel from "./MovieContentTopPanel/MovieContentTopPanel";
import MovieContentReviews from "./MovieContentReviews/MovieContentReviews";
import MovieContentDescription from "./MovieContentDescription/MovieContentDescription";
import MovieContentImages from "./MovieContentImages/MovieContentImages";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieReviews } from "@/store/movieSlice";
import MovieContentCredits from "./MovieContentCredits/MovieContentCredits";
import MovieContentInformation from "./MovieContentInformation/MovieContentInformation";

const MovieContent = () => {
  const dispatch = useAppDispatch();
  const { movieDetails, reviews } = useAppSelector((state) => state.movie);
  const credits = movieDetails?.credits;
  const images = movieDetails?.images;

  useEffect(() => {
    if (movieDetails?.id) dispatch(fetchMovieReviews({ movie_id: movieDetails?.id, page: 1 }));
  }, [movieDetails?.id, dispatch]);

  return (
    <main className={styles["movie-content"]}>
      <MovieContentTopPanel />
      <MovieContentDescription />
      {reviews?.results && reviews?.results?.length > 0 && <MovieContentReviews />}
      {credits?.cast && credits?.cast?.length > 0 && <MovieContentCredits />}
      <MovieContentInformation />
      {images?.backdrops && images?.backdrops?.length > 0 && <MovieContentImages />}
    </main>
  );
};

export default MovieContent;
