import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPopularTvSeries } from "@/store/tvSeriesSlice";
import TvSeriesList from "@/pages/tv-series/components/TvSeriesList";

const PopularTvSeriesPage = () => {
  const dispatch = useAppDispatch();
  const popularTvSeries = useAppSelector((state) => state.tvSeries.popularTvSeries);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchPopularTvSeries({ page: currentPage }));
  }, [dispatch, currentPage]);

  return (
    <main>
      {popularTvSeries && (
        <TvSeriesList
          tvSeries={popularTvSeries}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </main>
  );
};

export default PopularTvSeriesPage;
