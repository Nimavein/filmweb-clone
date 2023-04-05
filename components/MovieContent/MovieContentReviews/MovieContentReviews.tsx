import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieReviews } from "@/store/movieSlice";
import { MovieReview } from "@/types/types";
import MovieContentReview from "./MovieContentReview/MovieContentReview";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./MovieContentReviews.module.scss";

const MovieContentReviews = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const { reviews, movieDetails } = useAppSelector((state) => state.movie);

  useEffect(() => {
    if (movieDetails?.id)
      dispatch(
        fetchMovieReviews({ movie_id: movieDetails?.id, page: currentPage })
      );
  }, [dispatch, currentPage, movieDetails?.id]);

  return reviews?.results && reviews?.results?.length > 0 ? (
    <section className={styles["movie-reviews"]}>
      <h2 className={styles["movie-reviews__title"]}>Reviews</h2>
      <ul className={styles["movie-reviews__list"]}>
        {reviews?.results?.map((review: MovieReview) => (
          <li className={styles["movie-review__item"]} key={review.id}>
            <MovieContentReview {...review} />
          </li>
        ))}
      </ul>
      {reviews?.total_pages && reviews.total_pages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItemsAmount={reviews?.total_results}
          pageSize={10}
        />
      )}
    </section>
  ) : (
    <></>
  );
};

export default MovieContentReviews;
