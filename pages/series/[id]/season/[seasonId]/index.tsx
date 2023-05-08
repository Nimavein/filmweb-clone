import { useRouter } from "next/router";
import { useEffect } from "react";
import SeriesSeasonContent from "@/pages/series/[id]/season/[seasonId]/components/SeriesSeasonContent";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData, fetchSeriesSeasonData } from "@/store/seriesSlice";

const SeriesSeasons = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id, seasonId } = router.query;
  const { season, details } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchSeriesData(Number(id)));
    if (seasonId && season?.season_number !== Number(seasonId))
      dispatch(fetchSeriesSeasonData({ tv_id: Number(id), season_number: Number(seasonId) }));
  }, [seasonId]);

  return season && <SeriesSeasonContent />;
};

export default SeriesSeasons;
