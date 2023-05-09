"use client";

import React from "react";
import MovieReviewsList from "./components/MovieReviewsList";
import { PageIdParams } from "@/types/types";

const MovieReviews = ({ params: { id } }: PageIdParams) => {
  return (
    <main>
      <MovieReviewsList id={id} />
    </main>
  );
};

export default MovieReviews;
