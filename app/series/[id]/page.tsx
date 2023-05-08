"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData } from "@/store/seriesSlice";
import { useEffect } from "react";
import SeriesContent from "./components/Series";
import { useSearchParams } from "next/navigation";

const Series = () => {
  const dispatch = useAppDispatch();
  const id = useSearchParams().get("id");
  const { details } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchSeriesData(Number(id)));
  }, [id]);

  return details && <SeriesContent />;
};

export default Series;
