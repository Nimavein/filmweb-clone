import { useEffect } from "react";
import { fetchMovies } from "@/store/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import MoviesList from "@/components/MoviesList/MoviesList";

function PopularMoviesPage() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);
  console.log(movies);
    

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return <MoviesList movies={movies} />;
}

export default PopularMoviesPage;
