import React from "react";
import MovieReviewsList from "@/components/MovieReviewsList/MovieReviewsList";
import { useRouter } from "next/router";

const MoviesReviews = () => {
  const router = useRouter();

  const { id } = router.query;

  return <MovieReviewsList movieId={parseInt(id as string, 10)} />;
};

export default MoviesReviews;
