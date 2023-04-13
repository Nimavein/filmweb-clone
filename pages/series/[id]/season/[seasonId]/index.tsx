import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import SeriesSeasonContent from "@/components/SeriesSeasonContent/SeriesSeasonContent";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData, fetchSeriesSeasonData } from "@/store/seriesSlice";

const SeriesSeasons = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id, seasonId } = router.query;
  
  const { seasonStatus, season } = useAppSelector((state) => state.series);

  useEffect(() => {
    dispatch(fetchSeriesData(Number(id)));
    dispatch(fetchSeriesSeasonData({ tv_id: Number(id), season_number: Number(seasonId) }));
  }, [seasonId]);

  return seasonStatus === "loading" ? (
    <Loader />
  ) : (
    <>{season && Object.keys(season).length > 0 && <SeriesSeasonContent />}</>
  );
};

export default SeriesSeasons;
