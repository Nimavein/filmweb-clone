import React from "react";
import { useRouter } from "next/router";
import SeriesReviewsList from "@/components/SeriesReviewsList/SeriesReviewsList";

const SeriesReviews = () => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <main>
      <SeriesReviewsList seriesId={parseInt(id as string, 10)} />
    </main>
  );
};

export default SeriesReviews;
