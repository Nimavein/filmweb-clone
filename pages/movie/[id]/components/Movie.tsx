import React, { useEffect } from "react";
import styles from "./Movie.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCollectionData, fetchMovieReviews, resetCollection } from "@/store/movieSlice";
import MovieTopPanel from "./MovieTopPanel/MovieTopPanel";
import MovieCollection from "./MovieCollection/MovieCollection";
import MovieDescription from "./MovieDescription/MovieDescription";
import MovieInformation from "./MovieInformation/MovieInformation";
import MovieCredits from "./MovieCredits/MovieCredits";
import MovieImages from "./MovieImages/MovieImages";
import MovieReviews from "./MovieReviews/MovieReviews";

const MovieContent = () => {
  const dispatch = useAppDispatch();
  const { movieDetails, reviews, collection } = useAppSelector((state) => state.movie);
  const credits = movieDetails?.credits;
  const images = movieDetails?.images;

  useEffect(() => {
    if (movieDetails?.id && (reviews?.id !== movieDetails.id || reviews?.page !== 1)) {
      dispatch(fetchMovieReviews({ movie_id: movieDetails.id, page: 1 }));
    }
  }, [movieDetails?.id, dispatch]);

  useEffect(() => {
    if (
      movieDetails?.belongs_to_collection &&
      collection?.id !== movieDetails.belongs_to_collection?.id
    ) {
      dispatch(fetchCollectionData(movieDetails?.belongs_to_collection?.id));
    } else if (!movieDetails?.belongs_to_collection) {
      dispatch(resetCollection());
    }
  }, [movieDetails?.belongs_to_collection, dispatch]);

  return (
    <main className={styles["movie"]}>
      <MovieTopPanel />
      <MovieDescription />
      {movieDetails?.belongs_to_collection && collection && <MovieCollection />}
      {reviews?.results && reviews?.results?.length > 0 && <MovieReviews />}
      {credits?.cast && credits?.cast?.length > 0 && <MovieCredits />}
      <MovieInformation />
      {images?.backdrops && images?.backdrops?.length > 0 && <MovieImages />}
    </main>
  );
};

export default MovieContent;
