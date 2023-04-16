import React, { useEffect } from "react";
import VodPageContentFilter from "./VodPageContentFilter/VodPageContentFilter";
import VodPageContentMovies from "./VodPageContentMovies/VodPageContentMovies";
import styles from "./VodPageContent.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import VodPageContentTvSeries from "./VodPageContentTvSeries/VodPageContentTvSeries";
import { fetchWatchProviderMovies } from "@/store/moviesSlice";
import { fetchWatchProviderTvSeries } from "@/store/tvSeriesSlice";

const VodPageContent = () => {
  const { tv, filters } = useAppSelector((state) => state.watchProviders);
  const { watchProviderMovies } = useAppSelector((state) => state.movies);
  const { watchProviderTvSeries } = useAppSelector((state) => state.tvSeries);
  const chosenProviderName = tv?.results
    ?.find((provider) => provider.provider_id === filters?.watchProviderId)
    ?.provider_name?.toUpperCase();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!watchProviderMovies) dispatch(fetchWatchProviderMovies({page: 1, providerId: null}));
    if (!watchProviderTvSeries)
      dispatch(fetchWatchProviderTvSeries({page: 1, providerId: null}));
  }, []);

  return (
    <main className={styles["vod-page-content"]}>
      <h2 className={styles["vod-page-content__header"]}>{`Available content on ${
        chosenProviderName || "platforms"
      }`}</h2>
      <VodPageContentFilter />
      {watchProviderMovies && <VodPageContentMovies />}
      {watchProviderTvSeries && <VodPageContentTvSeries />}
    </main>
  );
};

export default VodPageContent;
