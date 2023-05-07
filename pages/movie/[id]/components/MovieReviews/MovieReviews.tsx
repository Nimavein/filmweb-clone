import React from "react";
import { useAppSelector } from "@/store";
import Link from "next/link";
import styles from "./MovieReviews.module.scss";
import sectionStyles from "../Movie.module.scss";
import Button from "@/components/Button/Button";
import MovieContentReview from "./MovieReview/MovieReview";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const MovieReviews = () => {
  const { movieDetails, reviews } = useAppSelector((state) => state.movie);
  const reviewsSectionHeader =
    `Reviews of the movie ${movieDetails?.title}`.toUpperCase();
  const displayedReviewsInCarousel = 3;

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
      <Carousel
        dots
        arrows
        nextArrow={<RightOutlined />}
        prevArrow={<LeftOutlined />}
        infinite={false}
      >
        {reviews?.results
          ?.slice(0, Math.min(displayedReviewsInCarousel, reviews?.results?.length))
          .map((review, index) => (
            <div key={index}>
              <MovieContentReview slideId={index} {...review} />
            </div>
          ))}
      </Carousel>
      {reviews?.results && reviews?.results?.length > displayedReviewsInCarousel && (
        <Link href={`/movie/${movieDetails?.id}/reviews`}>
          <Button>{`See all ${reviews?.results?.length} reviews`}</Button>
        </Link>
      )}
    </section>
  );
};

export default MovieReviews;
