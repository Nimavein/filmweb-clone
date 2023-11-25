import { ActiveMediaFiltersType, PagePaginationParams } from "@/types/types";
import { getTvSeriesRankingData } from "@/apiHelpers";
import MediaFilters from "@/components/MediaFilters/MediaFilters";
import TvSeriesList from "./components/TvSeriesList";

import styles from "./TvSeries.module.scss";

const TvSeries = async ({
  searchParams: { page, productionYear, genre, originalLanguage, sortBy },
}: PagePaginationParams) => {
  const activeFilters: ActiveMediaFiltersType = {
    productionYear: productionYear?.split(","),
    genre: genre?.split(","),
    originalLanguage: originalLanguage?.split(","),
  };
  const currentPage = parseInt(page) || 1;
  const tvSeries = await getTvSeriesRankingData(
    sortBy,
    activeFilters,
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
      />
      {tvSeries && (
        <TvSeriesList tvSeries={tvSeries} currentPage={currentPage} />
      )}
    </main>
  );
};

export default TvSeries;
