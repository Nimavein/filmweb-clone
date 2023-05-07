import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData, fetchSeriesReviews } from "@/store/seriesSlice";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./SeriesReviewsList.module.scss";
import { Review } from "@/types/types";
import SeriesReviewsListItem from "./SeriesReviewsListItem/SeriesReviewsListItem";
import { useRouter } from "next/router";

const SeriesReviewsList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { id } = router.query;

  const { reviews, details } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (id && (Number(id) !== details?.id)) dispatch(fetchSeriesData(Number(id)));
    if (id && (reviews?.id !== Number(id)) && (currentPage !== reviews?.page))
      dispatch(fetchSeriesReviews({ tv_id: Number(id), page: currentPage }));
  }, [dispatch, currentPage, id, reviews?.id]);

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
