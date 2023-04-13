import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import MoviesList from "@/components/MoviesList/MoviesList";
import { fetchPopularTvSeries } from "@/store/tvSeriesSlice";
import TvSeriesList from "@/components/TvSeriesList/TvSeriesList";

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