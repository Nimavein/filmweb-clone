import SeriesImagesList from "@/components/SeriesImagesList/SeriesImagesList";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData } from "@/store/seriesSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SeriesImages = () => {
  const router = useRouter();
  const { id } = router.query;

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
