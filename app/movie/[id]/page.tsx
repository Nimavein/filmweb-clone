"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieData } from "@/store/movieSlice";
import { useEffect } from "react";
import MovieContent from "./components/Movie";
import { PageIdParams } from "@/types/types";

const Movie = ({ params: { id } }: PageIdParams) => {
  const dispatch = useAppDispatch();

  const { movieDetails } = useAppSelector((state) => state.movie);

  useEffect(() => {
    if (id && Number(id) !== movieDetails?.id)
      dispatch(fetchMovieData(Number(id)));
  }, [id]);

  return movieDetails ? <MovieContent /> : <></>;
};

export default Movie;
