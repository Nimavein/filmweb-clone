import React from "react";
import { PageIdParams, Review } from "@/types/types";
import { getMovieReviews, getMovieData } from "@/api";
import MovieReview from "./components/MovieReview/MovieReview";
import Pagination from "@/components/Pagination/Pagination";

import styles from "./MovieReviews.module.scss";

const MovieReviews = async ({
  params: { id },
  searchParams: { page },
}: PageIdParams) => {
  const numberId = Number(id);
  const currentPage = parseInt(page) || 1;
  const reviews = await getMovieReviews(numberId, currentPage);
  const movieData = await getMovieData(numberId);

  return (
    <section className={styles["movie-reviews"]}>
      <h1
        className={styles["movie-reviews__title"]}
      >{`Reviews of ${movieData?.movieDetails?.title}`}</h1>
      <ul className={styles["movie-reviews__list"]}>
        {reviews?.results?.map((review: Review) => (
          <li className={styles["movie-reviews__item"]} key={review.id}>
            <MovieReview {...review} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalItemsAmount={reviews?.total_results}
        pageSize={20}
      />
    </section>
  );
};

export default MovieReviews;
