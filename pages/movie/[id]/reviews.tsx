import React from "react";
import MovieReviewsList from "@/components/MovieReviewsList/MovieReviewsList";
import { useRouter } from "next/router";

const MovieReviews = () => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <main>
      <MovieReviewsList movieId={parseInt(id as string, 10)} />
    </main>
  );
};

export default MovieReviews;
