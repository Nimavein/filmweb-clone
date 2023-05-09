import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieData, fetchMovieReviews } from "@/store/movieSlice";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./MovieReviewsList.module.scss";
import MovieReviewsListItem from "./MovieReviewsListItem/MovieReviewsListItem";
import { Review } from "@/types/types";

interface MovieReviewsListProps {
  id: string;
}

const MovieReviewsList = ({ id }: MovieReviewsListProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const { reviews, movieDetails } = useAppSelector((state) => state.movie);

  useEffect(() => {
    if (id && Number(id) !== movieDetails?.id) dispatch(fetchMovieData(Number(id)));
    if (id && Number(id) !== reviews?.id && reviews?.page !== currentPage)
      dispatch(fetchMovieReviews({ movie_id: Number(id), page: currentPage }));
  }, [dispatch, currentPage, id, movieDetails?.id]);

  return reviews?.results && reviews?.results?.length > 0 ? (
    <section className={styles["movie-reviews"]}>
      <h1 className={styles["movie-reviews__title"]}>{`Reviews of ${movieDetails?.title}`}</h1>
      <ul className={styles["movie-reviews__list"]}>
        {reviews?.results?.map((review: Review) => (
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
