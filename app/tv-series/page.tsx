import { ActiveMediaFiltersType, PagePaginationParams } from "@/types/types";
import MediaFilters from "@/components/MediaFilters/MediaFilters";
import TvSeriesList from "./components/TvSeriesList";
import { getTvSeriesData } from "@/apiHelpers";
import type { Metadata } from "next";

import styles from "./TvSeries.module.scss";

export const metadata: Metadata = {
  title: "Explore TV Series: Browse a Wide Range of Shows",
  description:
    "Immerse yourself in a world of television series. Use filters to refine your search and experience seamless pagination for effortless exploration. Find the latest episodes, timeless classics, and captivating series across genres.",
};

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
