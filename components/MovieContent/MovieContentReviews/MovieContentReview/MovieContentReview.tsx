import { MovieReview } from "@/types/types";
import React from "react";

const MovieContentReview = ({ author, content }: MovieReview) => {
  return (
    <div>
      {author} {content?.substring(0, 20)}
    </div>
  );
};

export default MovieContentReview;
