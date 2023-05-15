import React from "react";
import { useAppSelector } from "@/store";
import Link from "next/link";
import styles from "./SeriesReviews.module.scss";
import sectionStyles from "../Series.module.scss";
import Button from "@/components/Button/Button";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import SeriesReview from "./SeriesReview/SeriesReview";

const SeriesReviews = () => {
  const { details, reviews } = useAppSelector((state) => state.series);
  const reviewsSectionHeader =
    `Reviews of the series ${details?.name}`.toUpperCase();
  const displayedReviewsInCarousel = 3;

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
        {reviews?.results
          ?.slice(
            0,
            Math.min(displayedReviewsInCarousel, reviews?.results?.length)
          )
          .map((review, index) => (
            <div key={index}>
              <SeriesReview slideId={index} {...review} />
            </div>
          ))}
      </Carousel>
      {reviews?.results &&
        reviews?.results?.length > displayedReviewsInCarousel && (
          <Link href={`/series/${details?.id}/reviews`}>
            <Button>{`See all ${reviews?.results?.length} reviews`}</Button>
          </Link>
        )}
    </section>
  );
};

export default SeriesReviews;
