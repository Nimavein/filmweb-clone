import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieData } from "@/store/movieSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MovieContent from "./components/Movie";

const Movie = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = router.query;
  const { movieDetails, status } = useAppSelector((state) => state.movie);

  useEffect(() => {
    if ( id && Number(id) !== movieDetails?.id) dispatch(fetchMovieData(Number(id)));
  }, [id]);

  return status === "loading" ? (
    <Loader />
  ) : (
    <>
      {movieDetails && <MovieContent />}
    </>
  );
};

export default Movie;
