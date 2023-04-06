import React from "react";
import { MovieReview } from "@/types/types";

const MovieContentReview = ({ content, author_details }: MovieReview) => {
  console.log(content);

  return <div>{content}</div>;
};

export default MovieContentReview;
