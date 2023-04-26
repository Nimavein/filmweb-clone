import React, { useState } from "react";
import styles from "./MovieContentReview.module.scss";
import ReadMoreText from "@/components/ReadMoreText/ReadMoreText";
import Rating from "@/components/Rating/Rating";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import Image from "next/image";
import { useAppSelector } from "@/store";
import { Review } from "@/types/types";

type MovieContentReviewType = Review & {
  slideId: number;
};

const MovieContentReview = ({
  content,
  author_details,
  slideId,
}: MovieContentReviewType) => {
  const images = useAppSelector((state) => state.movie.movieDetails?.images);

  return (
    <div className={styles["movie-content__review"]}>
      {images?.backdrops && (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${images?.backdrops[slideId]?.file_path}`}
          alt=""
          width={296}
          height={162}
        />
      )}
      <div>
        {content && (
          <ReadMoreText
            textClassName={styles["movie-content__review-text"]}
            text={content}
            showTextLength={500}
          />
        )}
        <div className={styles["movie-content__review-user"]}>
          <UserAvatar avatarPath={author_details?.avatar_path} />
          <div className={styles["movie-content__review-user-wrapper"]}>
            <span className={styles["movie-content__review-user-name"]}>
              {author_details?.name}
            </span>
            {author_details?.rating && (
              <Rating
                showNumber
                disabled
                defaultValue={author_details.rating}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieContentReview;
