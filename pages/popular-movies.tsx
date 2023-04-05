import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import MoviesList from "@/components/MoviesList/MoviesList";
import { fetchPopularMovies } from "@/store/moviesSlice";

function PopularMoviesPage() {
  const dispatch = useAppDispatch();
  const popularMovies = useAppSelector((state) => state.movies.popularMovies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, []);

  return <MoviesList movies={popularMovies} />;
}

export default PopularMoviesPage;
