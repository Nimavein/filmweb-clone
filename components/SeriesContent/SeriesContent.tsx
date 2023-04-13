import React, { useEffect } from "react";
import styles from "./SeriesContent.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesReviews } from "@/store/seriesSlice";
import SeriesContentReviews from "./SeriesContentReviews/SeriesContentReviews";
import SeriesContentCredits from "./SeriesContentCredits/SeriesContentCredits";
import SeriesContentInformation from "./SeriesContentInformation/SeriesContentInformation";
import SeriesContentImages from "./SeriesContentImages/SeriesContentImages";
import SeriesContentTopPanel from "./SeriesContentTopPanel/SeriesContentTopPanel";
import SeriesContentDescription from "./SeriesContentDescription/SeriesContentDescription";

const SeriesContent = () => {
  const dispatch = useAppDispatch();
  const { details, reviews } = useAppSelector((state) => state.series);
  const aggregateCredits = details?.aggregate_credits;
  const images = details?.images;

  useEffect(() => {
    if (details?.id) dispatch(fetchSeriesReviews({ tv_id: details?.id, page: 1 }));
  }, [details?.id, dispatch]);

  return (
    <main className={styles["series-content"]}>
      <SeriesContentTopPanel />
      <SeriesContentDescription />
      {reviews?.results && reviews?.results?.length > 0 && <SeriesContentReviews />}
      {aggregateCredits?.cast && aggregateCredits?.cast?.length > 0 && <SeriesContentCredits />}
      <SeriesContentInformation />
      {images?.backdrops && images?.backdrops?.length > 0 && <SeriesContentImages />}
    </main>
  );
};

export default SeriesContent;
