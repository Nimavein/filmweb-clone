import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSeriesData } from "@/store/seriesSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SeriesContent from "./components/Series";

const Series = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = router.query;
  const { details, status } = useAppSelector((state) => state.series);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchSeriesData(Number(id)));
  }, [id]);

  return status === "loading" ? (
    <Loader />
  ) : (
    <>{details && <SeriesContent />}</>
  );
};

export default Series;
