import React, { useState } from "react";
import Rating from "@/components/Rating/Rating";
import styles from "../MovieReviewsList.module.scss";
import ReadMoreText from "@/components/ReadMoreText/ReadMoreText";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { Review } from "@/types/types";

const MovieReviewsListItem = ({ content, author_details }: Review) => {

  return (
    <>
      <UserAvatar
        avatarPath={author_details?.avatar_path}
        avatarClassname={styles["movie-reviews__item-avatar"]}
      />
      <div className={styles["movie-reviews__item-content"]}>
        <h2 className={styles["movie-reviews__item-author"]}>
          {author_details?.name}
        </h2>
        {content && (
          <ReadMoreText
            text={content}
            showTextLength={250}
          />
        )}
      </div>
      <div className={styles["movie-reviews__item-rating"]}>
        {author_details?.rating && (
          <Rating defaultValue={author_details.rating} small />
        )}
      </div>
    </>
  );
};

export default MovieReviewsListItem;
