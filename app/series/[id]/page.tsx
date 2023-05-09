"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData } from "@/store/seriesSlice";
import { useEffect } from "react";
import SeriesContent from "./components/Series";

const Series = () => {
  const dispatch = useAppDispatch();
  const id = 500;
  const { details } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchSeriesData(Number(id)));
  }, [id]);

  return details ? <SeriesContent /> : <></>;
};

export default Series;
