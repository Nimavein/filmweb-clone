import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesReviews } from "@/store/seriesSlice";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./SeriesReviewsList.module.scss";
import { Review } from "@/types/types";
import SeriesReviewsListItem from "./SeriesReviewsListItem/SeriesReviewsListItem";

interface SeriesReviewsListProps {
  seriesId: number;
}

const SeriesReviewsList = ({ seriesId }: SeriesReviewsListProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const { reviews, details } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (seriesId && reviews?.id !== seriesId && currentPage !== reviews?.page)
      dispatch(fetchSeriesReviews({ tv_id: seriesId, page: currentPage }));
  }, [dispatch, currentPage, seriesId]);

  return reviews?.results && reviews?.results?.length > 0 ? (
    <section className={styles["series-reviews"]}>
      <h1 className={styles["series-reviews__title"]}>{`Reviews of ${details?.name}`}</h1>
      <ul className={styles["series-reviews__list"]}>
        {reviews?.results?.map((review: Review) => (
          <li className={styles["series-reviews__item"]} key={review.id}>
            <SeriesReviewsListItem {...review} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItemsAmount={reviews?.total_results}
        pageSize={20}
      />
    </section>
  ) : (
    <></>
  );
};

export default SeriesReviewsList;
