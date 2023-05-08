import React, { useState } from "react";
import Rating from "@/components/Rating/Rating";
import styles from "../SeriesReviewsList.module.scss";
import ReadMoreText from "@/components/ReadMoreText/ReadMoreText";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { Review } from "@/types/types";

const SeriesReviewsListItem = ({ content, author_details }: Review) => {
  return (
    <>
      <UserAvatar
        avatarPath={author_details?.avatar_path}
        avatarClassname={styles["series-reviews__item-avatar"]}
      />
      <div className={styles["series-reviews__item-content"]}>
        <h2 className={styles["series-reviews__item-author"]}>{author_details?.name}</h2>
        {content && (
          <ReadMoreText
            text={content}
            showTextLength={250}
          />
        )}
      </div>
      <div className={styles["series-reviews__item-rating"]}>
        {author_details?.rating && <Rating defaultValue={author_details.rating} small />}
      </div>
    </>
  );
};

export default SeriesReviewsListItem;
