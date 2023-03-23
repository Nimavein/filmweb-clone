import { useEffect } from "react";
import { fetchMovies } from "@/store/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import MoviesList from "@/components/MoviesList/MoviesList";

function PopularMoviesPage() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);
  const status = useAppSelector((state) => state.movies.status);
  const error = useAppSelector((state) => state.movies.error);
  console.log(movies);
  

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }
  return <MoviesList movies={movies} />;
}

export default PopularMoviesPage;
