import React, { useEffect } from "react";
import styles from "./Series.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesReviews } from "@/store/seriesSlice";
import SeriesTopPanel from "./SeriesTopPanel/SeriesTopPanel";
import SeriesDescription from "./SeriesDescription/SeriesDescription";
import SeriesReviews from "./SeriesReviews/SeriesReviews";
import SeriesCredits from "./SeriesCredits/SeriesCredits";
import SeriesInformation from "./SeriesInformation/SeriesInformation";
import SeriesImages from "./SeriesImages/SeriesImages";

const SeriesContent = () => {
  const dispatch = useAppDispatch();
  const { details, reviews } = useAppSelector((state) => state.series);
  const aggregateCredits = details?.aggregate_credits;
  const images = details?.images;

  useEffect(() => {
    if (details?.id && (reviews?.id !== details?.id || reviews?.page !== 1))
      dispatch(fetchSeriesReviews({ tv_id: details?.id, page: 1 }));
  }, [details?.id, dispatch]);

  return (
    <main className={styles["series"]}>
      <SeriesTopPanel />
      <SeriesDescription />
      {reviews?.results && reviews?.results?.length > 0 && <SeriesReviews />}
      {aggregateCredits?.cast && aggregateCredits?.cast?.length > 0 && <SeriesCredits />}
      <SeriesInformation />
      {images?.backdrops && images?.backdrops?.length > 0 && <SeriesImages />}
    </main>
  );
};

export default SeriesContent;
