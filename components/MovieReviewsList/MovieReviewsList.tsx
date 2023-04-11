import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieReviews } from "@/store/movieSlice";
import { MovieReview } from "@/types/types";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./MovieReviewsList.module.scss";
import MovieReviewsListItem from "./MovieReviewsListItem/MovieReviewsListItem";

interface MovieReviewsListProps {
  movieId: number;
}

const MovieReviewsList = ({ movieId }: MovieReviewsListProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const { reviews, movieDetails } = useAppSelector((state) => state.movie);

  useEffect(() => {
    if (movieId)
      dispatch(fetchMovieReviews({ movie_id: movieId, page: currentPage }));
  }, [dispatch, currentPage, movieId]);

  return reviews?.results && reviews?.results?.length > 0 ? (
    <section className={styles["movie-reviews"]}>
      <h1
        className={styles["movie-reviews__title"]}
      >{`Reviews of ${movieDetails?.title}`}</h1>
      <ul className={styles["movie-reviews__list"]}>
        {reviews?.results?.map((review: MovieReview) => (
          <li className={styles["movie-reviews__item"]} key={review.id}>
            <MovieReviewsListItem {...review} />
          </li>
        ))}
      </ul>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItemsAmount={reviews?.total_results}
          pageSize={20}
        />
    </section>
  ) : (
    <></>
  );
};

export default MovieReviewsList;
