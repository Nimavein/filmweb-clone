import React from "react";
import { PageIdParams, Review } from "@/types/types";
import { getSeriesData, getSeriesReviews } from "@/api";
import SeriesReview from "./components/SeriesReview/SeriesReview";
import Pagination from "@/components/Pagination/Pagination";

import styles from "./SeriesReviews.module.scss";

const SeriesReviews = async ({
  params: { id },
  searchParams: { page },
}: PageIdParams) => {
  const numberId = Number(id);
  const currentPage = parseInt(page) || 1;
  const reviews = await getSeriesReviews(numberId, currentPage);
  const seriesData = await getSeriesData(numberId);
  const seriesDetails = seriesData?.seriesDetails;
  return (
    <main>
      <section className={styles["series-reviews"]}>
        <h1
          className={styles["series-reviews__title"]}
        >{`Reviews of ${seriesDetails?.name}`}</h1>
        <ul className={styles["series-reviews__list"]}>
          {reviews?.results?.map((review: Review) => (
            <li className={styles["series-reviews__item"]} key={review.id}>
              <SeriesReview {...review} />
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalItemsAmount={reviews?.total_results}
          pageSize={20}
        />
      </section>
    </main>
  );
};

export default SeriesReviews;
