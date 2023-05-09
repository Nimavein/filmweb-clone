"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData, fetchSeriesSeasonData } from "@/store/seriesSlice";
import SeriesSeasonContent from "./components/SeriesSeasonContent";
import { SeasonPageParams } from "@/types/types";

const SeriesSeasons = ({ params: { id, seasonId } }: SeasonPageParams) => {
  const dispatch = useAppDispatch();
  const { season, details } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchSeriesData(Number(id)));
    if (seasonId && season?.season_number !== Number(seasonId))
      dispatch(
        fetchSeriesSeasonData({
          tv_id: Number(id),
          season_number: Number(seasonId),
        })
      );
  }, [seasonId]);

  return season && <SeriesSeasonContent />;
};

export default SeriesSeasons;
