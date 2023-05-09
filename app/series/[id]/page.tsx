"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData } from "@/store/seriesSlice";
import { useEffect } from "react";
import SeriesContent from "./components/Series";
import { PageIdParams } from "@/types/types";

const Series = ({ params: { id } }: PageIdParams) => {
  const dispatch = useAppDispatch();
  const { details } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchSeriesData(Number(id)));
  }, [id]);

  return <></>;
};

export default Series;
