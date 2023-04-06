import MovieImagesList from "@/components/MovieImagesList/MovieImagesList";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieData } from "@/store/movieSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MovieImages = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const { images } = useAppSelector((state) => state.movie);

  useEffect(() => {
    if (id && !images) dispatch(fetchMovieData(Number(id)));
  }, [images, id, dispatch]);

  return (
    <main>
      <MovieImagesList />
    </main>
  );
};

export default MovieImages;
