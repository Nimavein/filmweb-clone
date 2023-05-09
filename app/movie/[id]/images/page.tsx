"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMovieData } from "@/store/movieSlice";
import React, { useEffect } from "react";
import MovieImagesList from "./components/MovieImagesList";
import { PageIdParams } from "@/types/types";

const MovieImages = ({ params: { id } }: PageIdParams) => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.movie.movieDetails?.images);

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
