import { ActiveMediaFiltersType, PagePaginationParams } from "@/types/types";
import MediaFilters from "@/components/MediaFilters/MediaFilters";
import TvSeriesList from "./components/TvSeriesList";
import { getTvSeriesData } from "@/apiHelpers";

import styles from "./TvSeries.module.scss";

const TvSeries = async ({
  searchParams: {
    page,
    productionYear,
    genre,
    originalLanguage,
    sortBy,
    watchProviders,
    minVoteCount,
  },
}: PagePaginationParams) => {
  const activeFilters: ActiveMediaFiltersType = {
    productionYear: productionYear?.split(","),
    genre: genre?.split(","),
    originalLanguage: originalLanguage?.split(","),
    providers: watchProviders?.split(","),
  };
  const currentPage = parseInt(page) || 1;
  const tvSeries = await getTvSeriesData(
    sortBy,
    activeFilters,
    minVoteCount,
    currentPage
  );

  return (
    <main className={styles["tv-series"]}>
      <h1 className={styles["tv-series__header"]}>
        TV SERIES FOUND: {tvSeries?.total_results}
      </h1>
      <MediaFilters
        contentType="tv-series"
        activeFilters={activeFilters}
        sortBy={sortBy}
        minVoteCount={minVoteCount || "500"}
      />
      {tvSeries && (
        <TvSeriesList tvSeries={tvSeries} currentPage={currentPage} />
      )}
    </main>
  );
};

export default TvSeries;
