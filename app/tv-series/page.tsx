import { ActiveMediaFiltersType, PagePaginationParams } from "@/types/types";
import { getTvSeriesGenres, getTvSeriesRankingData } from "@/apiHelpers";
import MediaFilters from "@/components/MediaFilters/MediaFilters";
import TvSeriesList from "./components/TvSeriesList";

import styles from "./TvSeries.module.scss";

const TvSeries = async ({
  searchParams: { page, productionYear, genre, originalLanguage },
}: PagePaginationParams) => {
  const activeFilters: ActiveMediaFiltersType = {
    productionYear,
    genre,
    originalLanguage,
  };
  const currentPage = parseInt(page) || 1;
  const tvSeries = await getTvSeriesRankingData(
    undefined,
    activeFilters,
    currentPage
  );
  const genres = await getTvSeriesGenres();

  return (
    <main className={styles["tv-series"]}>
      <MediaFilters
        contentType="movies"
        activeFilters={activeFilters}
        genres={genres || []}
      />
      {tvSeries && (
        <TvSeriesList tvSeries={tvSeries} currentPage={currentPage} />
      )}
    </main>
  );
};

export default TvSeries;
