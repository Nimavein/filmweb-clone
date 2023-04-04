import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieReviews } from "@/store/movieSlice";
import { MovieReview } from "@/types/types";
import MovieContentReview from "./MovieContentReview/MovieContentReview";
import Pagination from "@/components/Pagination/Pagination";

interface MovieContentReviewsProps {
  id: number;
}

const MovieContentReviews = ({ id }: MovieContentReviewsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const { reviews } = useAppSelector((state) => state.movie);
  console.log(reviews);

  useEffect(() => {
    if (id) dispatch(fetchMovieReviews({ movie_id: id, page: currentPage }));
  }, [dispatch, id, currentPage]);

  return (
    <section>
      <ul>
        {reviews?.results?.map((review: MovieReview) => (
          <li key={review.id}>
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
  );
};

export default MovieContentReviews;
