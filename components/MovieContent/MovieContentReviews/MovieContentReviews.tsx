import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";
import styles from "./MovieContentReviews.module.scss";
import sectionStyles from "../MovieContent.module.scss";
import Button from "@/components/Button/Button";
import useEmblaCarousel from "embla-carousel-react";
import MovieContentReview from "./MovieContentReview/MovieContentReview";
import { fetchMovieReviews } from "@/store/movieSlice";

const MovieContentReviews = () => {
  const dispatch = useAppDispatch();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [viewportRef, embla] = useEmblaCarousel();
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const { movieDetails, reviews } = useAppSelector((state) => state.movie);
  const reviewsHeader =
    `Review of the movie ${movieDetails?.title}`.toUpperCase();

  useEffect(() => {
    if (movieDetails?.id && !reviews)
      dispatch(fetchMovieReviews({ movie_id: movieDetails?.id, page: 1 }));
  }, [movieDetails?.id, dispatch, reviews]);

  const onSelect = (index: number) => {
    setSelectedIndex(index);
    embla?.scrollTo(index);
  };

  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

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
      <div className={styles.embla}>
        <div className={styles.viewport} ref={viewportRef}>
          <div
            className={styles["embla__container"]}
            aria-label={"reviews slider"}
          >
            {reviews?.results?.slice(0, 3).map((review, index) => (
              <div
                className={`${styles["embla__slide"]} ${
                  index === selectedIndex
                    ? styles["embla__slide--selected"]
                    : ""
                }`}
                key={index}
                onClick={() => onSelect(index)}
                role="button"
                aria-label={`Slide ${index + 1}`}
                tabIndex={0}
              >
                <MovieContentReview {...review} />
              </div>
            ))}
          </div>
        </div>
        <button
          className={styles.button}
          ref={prevButtonRef}
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          Prev
        </button>
        <button
          className={styles.button}
          ref={nextButtonRef}
          onClick={scrollNext}
          aria-label="Next slide"
        >
          Next
        </button>
      </div>
      <Link href={`/movie/${movieDetails?.id}/reviews`}>
        <Button>See all</Button>
      </Link>
    </section>
  );
};

export default MovieContentReviews;
