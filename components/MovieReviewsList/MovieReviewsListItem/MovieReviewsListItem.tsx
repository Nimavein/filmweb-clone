import React, { useState } from "react";
import Rating from "@/components/Rating/Rating";
import styles from "../MovieReviewsList.module.scss";
import ReadMoreText from "@/components/ReadMoreText/ReadMoreText";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { Review } from "@/types/types";

const MovieReviewsListItem = ({ content, author_details }: Review) => {
  const [isReadMore, setIsReadMore] = useState<boolean>(false);

  return (
    <>
      <UserAvatar
        avatarPath={author_details?.avatar_path}
        avatarClassname={styles["movie-review__item-avatar"]}
      />
      <div className={styles["movie-review__item-content"]}>
        <h3 className={styles["movie-review__item-author"]}>
          {author_details?.name}
        </h3>
        {content && (
          <ReadMoreText
            text={content}
            isReadMore={isReadMore}
            setIsReadMore={setIsReadMore}
            showTextLength={250}
          />
        )}
      </div>
      <div className={styles["movie-review__item-rating"]}>
        {author_details?.rating && (
          <Rating defaultValue={author_details.rating} small />
        )}
      </div>
    </>
  );
};

export default MovieReviewsListItem;
