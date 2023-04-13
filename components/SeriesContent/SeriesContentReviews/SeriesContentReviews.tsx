import React from "react";
import { useAppSelector } from "@/store";
import Link from "next/link";
import styles from "./SeriesContentReviews.module.scss";
import sectionStyles from "../SeriesContent.module.scss";
import Button from "@/components/Button/Button";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import SeriesContentReview from "./SeriesContentReview/SeriesContentReview";

const SeriesContentReviews = () => {
  const { details, reviews } = useAppSelector((state) => state.series);
  const reviewsSectionHeader = `Reviews of the series ${details?.name}`.toUpperCase();
  const displayedReviewsInCarousel = 3;

  return (
    <section
      className={`${styles["series-content__reviews"]} ${sectionStyles["series-content__section"]}`}
      aria-labelledby="series-content-reviews"
    >
      <h2
        id="series-content-reviews"
        className={`${styles["series-content__reviews-header"]} ${sectionStyles["series-content__section-header"]}`}
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
              <SeriesContentReview slideId={index} {...review} />
            </div>
          ))}
      </Carousel>
      {reviews?.results && reviews?.results?.length > displayedReviewsInCarousel && (
        <Link href={`/series/${details?.id}/reviews`}>
          <Button>See all</Button>
        </Link>
      )}
    </section>
  );
};

export default SeriesContentReviews;
