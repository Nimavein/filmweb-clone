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
  

  const { seasonStatus, season, details } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchSeriesData(Number(id)));
    if (seasonId && season?.season_number !== Number(seasonId))
      dispatch(fetchSeriesSeasonData({ tv_id: Number(id), season_number: Number(seasonId) }));
  }, [seasonId]);

  return seasonStatus === "loading" ? (
    <Loader />
  ) : (
    <>{season && <SeriesSeasonContent />}</>
  );
};

export default SeriesSeasons;
