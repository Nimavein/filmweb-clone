import VodFilter from "./components/VodFilter/VodFilter";
import { getWatchProviders } from "@/apiHelpers/watchProvidersApi";
import { getWatchProviderMovies, getWatchProviderTvSeries } from "@/apiHelpers";
import { PageVodParams, WatchProvidersFiltersType } from "@/types/types";
import MediaCarousel from "@/components/MediaCarousel/MediaCarousel";
import VodMovie from "./components/VodMovie/VodMovie";

import styles from "./Vod.module.scss";
import VodSeries from "./components/VodSeries/VodSeries";

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
  const watchProviderTvSeries = await getWatchProviderTvSeries(
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
        <MediaCarousel
          medias={watchProviderMovies}
          type="movies"
          title="AVAILABLE MOVIES"
        >
          {watchProviderMovies?.results?.map((movie) => (
            <VodMovie key={movie.id} {...movie} />
          ))}
        </MediaCarousel>
      )}
      {watchProviderTvSeries && (
        <MediaCarousel
          medias={watchProviderTvSeries}
          type="tv-series"
          title="AVAILABLE TV SERIES"
        >
          {watchProviderTvSeries?.results?.map((series) => (
            <VodSeries key={series.id} {...series} />
          ))}
        </MediaCarousel>
      )}
    </main>
  );
};

export default VodPage;
