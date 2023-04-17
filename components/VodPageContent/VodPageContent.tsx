import React, { useEffect } from "react";
import VodPageContentFilter from "./VodPageContentFilter/VodPageContentFilter";
import VodPageContentMovies from "./VodPageContentMovies/VodPageContentMovies";
import styles from "./VodPageContent.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import VodPageContentTvSeries from "./VodPageContentTvSeries/VodPageContentTvSeries";
import { fetchWatchProviderMovies } from "@/store/moviesSlice";
import { fetchWatchProviderTvSeries } from "@/store/tvSeriesSlice";

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
    <main className={styles["vod-page-content"]}>
      <VodPageContentFilter />
      {watchProviderMovies && <VodPageContentMovies />}
      {watchProviderTvSeries && <VodPageContentTvSeries />}
    </main>
  );
};

export default VodPageContent;
