"use client";

import React from "react";
import Link from "next/link";
import styles from "./SeriesReviews.module.scss";
import sectionStyles from "../../Series.module.scss";
import Button from "@/components/Button/Button";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import SeriesReview from "./SeriesReview/SeriesReview";
import { Reviews, SeriesDetails } from "@/types/types";

interface SeriesTopPanelProps {
  seriesDetails: SeriesDetails;
  reviews: Reviews;
}

const SeriesReviews = ({
  seriesDetails: { name, id, images },
  reviews,
}: SeriesTopPanelProps) => {
  const reviewsSectionHeader = `Reviews of the series ${name}`.toUpperCase();
  const displayedReviewsInCarousel = 3;
  const reviewsToDisplay = reviews?.results?.slice(
    0,
    Math.min(displayedReviewsInCarousel, reviews?.results?.length)
  );

  return (
    <section
      className={`${styles["series-reviews"]} ${sectionStyles["series-section"]}`}
      aria-labelledby="series-reviews"
    >
      <h2
        id="series-content-reviews"
        className={`${styles["series-reviews__header"]} ${sectionStyles["series-section__header"]}`}
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
        {reviewsToDisplay?.map((review, index) => (
          <div key={index}>
            <SeriesReview slideId={index} images={images} {...review} />
          </div>
        ))}
      </Carousel>
      {reviews?.results &&
        reviews?.results?.length > displayedReviewsInCarousel && (
          <Link href={`/series/${id}/reviews`}>
            <Button>{`See all ${reviews?.results?.length} reviews`}</Button>
          </Link>
        )}
    </section>
  );
};

export default SeriesReviews;
