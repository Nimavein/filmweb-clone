import React, { useEffect } from "react";
import styles from "./MovieContent.module.scss";
import MovieContentTopPanel from "./MovieContentTopPanel/MovieContentTopPanel";
import MovieContentReviews from "./MovieContentReviews/MovieContentReviews";
import MovieContentDescription from "./MovieContentDescription/MovieContentDescription";
import MovieContentImages from "./MovieContentImages/MovieContentImages";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieReviews } from "@/store/movieSlice";

const MovieContent = () => {
  const dispatch = useAppDispatch();
  const { movieDetails, reviews, images } = useAppSelector(
    (state) => state.movie
  );

  useEffect(() => {
    if (movieDetails?.id)
      dispatch(fetchMovieReviews({ movie_id: movieDetails?.id, page: 1 }));
  }, [movieDetails?.id, dispatch]);

  return (
    <main className={styles["movie-content"]}>
      <MovieContentTopPanel />
      <MovieContentDescription />
      {reviews?.results && reviews?.results?.length > 0 && (
        <MovieContentReviews />
      )}
      {images?.backdrops && images?.backdrops?.length > 0 && (
        <MovieContentImages />
      )}
    </main>
  );
};

export default MovieContent;
