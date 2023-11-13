import { PagePaginationParams } from "@/types/types";
import { getPopularTvSeries } from "@/api";
import TvSeriesList from "../components/TvSeriesList";

const PopularTvSeriesPage = async ({
  searchParams: { page },
}: PagePaginationParams) => {
  const currentPage = parseInt(page) || 1;
  const popularTvSeries = await getPopularTvSeries(currentPage);

  return (
    <main>
      {popularTvSeries && (
        <TvSeriesList tvSeries={popularTvSeries} currentPage={currentPage} />
      )}
    </main>
  );
};

export default PopularTvSeriesPage;
