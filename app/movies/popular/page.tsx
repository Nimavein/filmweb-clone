"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPopularMovies } from "@/store/moviesSlice";
import MoviesList from "../components/MoviesList";

const PopularMoviesPage = () => {
  const dispatch = useAppDispatch();
  const popularMovies = useAppSelector((state) => state.movies.popularMovies);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (!popularMovies || popularMovies?.page !== currentPage)
      dispatch(fetchPopularMovies({ page: currentPage }));
  }, [dispatch, currentPage]);

  return (
    <main>
      {popularMovies && (
        <MoviesList
          movies={popularMovies}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </main>
  );
};

export default PopularMoviesPage;
