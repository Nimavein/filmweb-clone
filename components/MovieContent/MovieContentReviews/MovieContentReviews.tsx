import React from "react";
import { useAppSelector } from "@/store";
import Link from "next/link";
import styles from "./MovieContentReviews.module.scss";
import sectionStyles from "../MovieContent.module.scss";
import Button from "@/components/Button/Button";
import MovieContentReview from "./MovieContentReview/MovieContentReview";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const MovieContentReviews = () => {
  const { movieDetails, reviews } = useAppSelector((state) => state.movie);
  const reviewsSectionHeader =
    `Reviews of the movie ${movieDetails?.title}`.toUpperCase();
  const displayedReviewsInCarousel = 3;

  return (
    <section
      className={`${styles["movie-content__reviews"]} ${sectionStyles["movie-content__section"]}`}
      aria-labelledby="movie-content-reviews"
    >
      <h2
        id="movie-content-reviews"
        className={`${styles["movie-content__reviews-header"]} ${sectionStyles["movie-content__section-header"]}`}
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

export default MovieContentReviews;
