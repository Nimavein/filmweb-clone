import VodFilter from "./components/VodFilter/VodFilter";
import VodMovies from "./components/VodMovies/VodMovies";
import VodTvSeries from "./components/VodTvSeries/VodTvSeries";
import { getWatchProviders } from "@/api/watchProvidersApi";
import { getWatchProviderMovies, getWatchProviderTvSeries } from "@/api";

import styles from "./Vod.module.scss";
import { PageVodParams, WatchProvidersFiltersType } from "@/types/types";

const VodPage = async ({
  searchParams: { watchProvider, sortBy = "popularity.desc" },
}: PageVodParams) => {
  const watchProviderId = parseInt(watchProvider);
  const filters: WatchProvidersFiltersType = {
    watchProviderId,
    sortBy,
  };
  const { moviesProviders, tvProviders } = await getWatchProviders();
  const watchProviderMovies = await getWatchProviderMovies(
    1,
    watchProviderId,
    sortBy
  );
  const tvSeriesProviderMovies = await getWatchProviderTvSeries(
    1,
    watchProviderId,
    sortBy
  );

  return (
    <main className={styles["vod"]}>
      <VodFilter
        tvProviders={tvProviders}
        moviesProviders={moviesProviders}
        filters={filters}
      />
      {watchProviderMovies && (
        <VodMovies watchProviderMovies={watchProviderMovies} />
      )}
      {tvSeriesProviderMovies && (
        <VodTvSeries watchProviderTvSeries={tvSeriesProviderMovies} />
      )}
    </main>
  );
};

export default VodPage;
