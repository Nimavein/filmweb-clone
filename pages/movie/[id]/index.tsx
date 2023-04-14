import Loader from "@/components/Loader/Loader";
import MovieContent from "@/components/MovieContent/MovieContent";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieData } from "@/store/movieSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
      {movieDetails && Object.keys(movieDetails).length > 0 && <MovieContent />}
    </>
  );
};

export default Movie;
