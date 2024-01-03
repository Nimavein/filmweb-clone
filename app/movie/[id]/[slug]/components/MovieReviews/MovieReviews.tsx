"use client";

import React from "react";
import Link from "next/link";
import styles from "./MovieReviews.module.scss";
import sectionStyles from "../../Movie.module.scss";
import Button from "@/components/Button/Button";
import MovieContentReview from "./MovieReview/MovieReview";
import { MovieDetails, Reviews } from "@/types/types";
import Carousel from "@/components/Carousel/Carousel";
import getHref from "@/helpers/getHref";

interface MovieReviewsProps {
  movieDetails: MovieDetails;
  movieReviews: Reviews;
}

const MovieReviews = ({ movieDetails, movieReviews }: MovieReviewsProps) => {
  const reviews = movieReviews?.results;
  const reviewsSectionHeader =
    `Reviews of the movie ${movieDetails?.title}`.toUpperCase();
  const displayedReviewsInCarousel = 3;
  const reviewsToDisplay = reviews?.slice(
    0,
    Math.min(displayedReviewsInCarousel, reviews.length)
  );

  return (
    <section
      className={`${styles["movie-reviews"]} ${sectionStyles["movie-section"]}`}
      aria-labelledby="movie-content-reviews"
    >
      <h2
        id="movie-content-reviews"
        className={`${styles["movie-reviews__header"]} ${sectionStyles["movie-section__header"]}`}
      >
        {reviewsSectionHeader}
      </h2>
      <Carousel slidesToShow={1} responsive={[]} dots>
        {reviewsToDisplay?.map((review, index) => (
          <div key={index}>
            <MovieContentReview
              slideId={index}
              {...review}
              movieImages={movieDetails?.images}
            />
          </div>
        ))}
      </Carousel>
      {reviews && reviews?.length > displayedReviewsInCarousel && (
        <Link
          href={`${getHref(
            "movie",
            movieDetails.title,
            movieDetails.id
          )}reviews`}
        >
          <Button>{`See all ${reviews?.length} reviews`}</Button>
        </Link>
      )}
    </section>
  );
};

export default MovieReviews;
