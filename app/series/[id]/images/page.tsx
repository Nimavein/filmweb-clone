"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData } from "@/store/seriesSlice";
import React, { useEffect } from "react";
import SeriesImagesList from "./components/SeriesImagesList";
import { PageIdParams } from "@/types/types";

const SeriesImages = ({ params: { id } }: PageIdParams) => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.series.details?.images);

  useEffect(() => {
    if (id && !images) dispatch(fetchSeriesData(Number(id)));
  }, [images, id, dispatch]);

  return (
    <main>
      <SeriesImagesList />
    </main>
  );
};

export default SeriesImages;
