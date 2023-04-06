import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";
import styles from "./MovieContentReviews.module.scss";
import sectionStyles from "../MovieContent.module.scss";
import Button from "@/components/Button/Button";
import MovieContentReview from "./MovieContentReview/MovieContentReview";
import { fetchMovieReviews } from "@/store/movieSlice";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const MovieContentReviews = () => {
  const dispatch = useAppDispatch();
  const { movieDetails, reviews } = useAppSelector((state) => state.movie);
  const reviewsHeader =
    `Review of the movie ${movieDetails?.title}`.toUpperCase();

  useEffect(() => {
    if (movieDetails?.id && !reviews)
      dispatch(fetchMovieReviews({ movie_id: movieDetails?.id, page: 1 }));
  }, [movieDetails?.id, dispatch, reviews]);

  return (
    <section
      className={`${styles["movie-content__reviews"]} ${sectionStyles["movie-content__section"]}`}
      aria-labelledby="movie-content-reviews"
    >
      <h2
        id="movie-content-reviews"
        className={`${styles["movie-content__reviews-header"]} ${sectionStyles["movie-content__section-header"]}`}
      >
        {reviewsHeader}
      </h2>
      <Carousel
        dots
        arrows
        nextArrow={<RightOutlined />}
        prevArrow={<LeftOutlined />}
      >
        {reviews?.results?.slice(0, 3).map((review, index) => (
          <div key={index}>
            <MovieContentReview slideId={index} {...review} />
          </div>
        ))}
      </Carousel>
      <Link href={`/movie/${movieDetails?.id}/reviews`}>
        <Button>See all</Button>
      </Link>
    </section>
  );
};

export default MovieContentReviews;
