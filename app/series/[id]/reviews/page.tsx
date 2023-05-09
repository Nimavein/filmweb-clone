import React from "react";
import SeriesReviewsList from "./components/SeriesReviewsList";
import { PageIdParams } from "@/types/types";

const SeriesReviews = ({ params: { id } }: PageIdParams) => {
  return (
    <main>
      <SeriesReviewsList id={id} />
    </main>
  );
};

export default SeriesReviews;
