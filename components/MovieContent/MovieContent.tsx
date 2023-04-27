import React, { useEffect } from "react";
import styles from "./MovieContent.module.scss";
import MovieContentTopPanel from "./MovieContentTopPanel/MovieContentTopPanel";
import MovieContentReviews from "./MovieContentReviews/MovieContentReviews";
import MovieContentDescription from "./MovieContentDescription/MovieContentDescription";
import MovieContentImages from "./MovieContentImages/MovieContentImages";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCollectionData, fetchMovieReviews } from "@/store/movieSlice";
import MovieContentCredits from "./MovieContentCredits/MovieContentCredits";
import MovieContentInformation from "./MovieContentInformation/MovieContentInformation";
import MovieContentCollection from "./MovieContentCollection/MovieContentCollection";

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
    }
  }, [movieDetails?.belongs_to_collection, dispatch]);

  return (
    <main className={styles["movie-content"]}>
      <MovieContentTopPanel />
      <MovieContentDescription />
      {movieDetails?.belongs_to_collection && collection && <MovieContentCollection />}
      {reviews?.results && reviews?.results?.length > 0 && <MovieContentReviews />}
      {credits?.cast && credits?.cast?.length > 0 && <MovieContentCredits />}
      <MovieContentInformation />
      {images?.backdrops && images?.backdrops?.length > 0 && <MovieContentImages />}
    </main>
  );
};

export default MovieContent;
