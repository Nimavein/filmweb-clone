import React, { useEffect } from "react";
import styles from "./Vod.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWatchProviderMovies } from "@/store/moviesSlice";
import { fetchWatchProviderTvSeries } from "@/store/tvSeriesSlice";
import VodFilter from "./VodFilter/VodFilter";
import VodMovies from "./VodMovies/VodMovies";
import VodTvSeries from "./VodTvSeries/VodTvSeries";

const VodPageContent = () => {
  const { filters } = useAppSelector((state) => state.watchProviders);
  const { watchProviderMovies } = useAppSelector((state) => state.movies);
  const { watchProviderTvSeries } = useAppSelector((state) => state.tvSeries);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!watchProviderMovies)
      dispatch(
        fetchWatchProviderMovies({
          page: 1,
          providerId: filters.watchProviderId,
          filterBy: filters.filterBy,
        })
      );
    if (!watchProviderTvSeries)
      dispatch(
        fetchWatchProviderTvSeries({
          page: 1,
          providerId: filters.watchProviderId,
          filterBy: filters.filterBy,
        })
      );
  }, []);

  return (
    <main className={styles["vod"]}>
      <VodFilter />
      {watchProviderMovies && <VodMovies />}
      {watchProviderTvSeries && <VodTvSeries />}
    </main>
  );
};

export default VodPageContent;
