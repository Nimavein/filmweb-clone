import React, { useState } from "react";
import { MovieReview } from "@/types/types";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Image from "next/image";
import Rating from "@/components/Rating/Rating";
import styles from "../MovieContentReviews.module.scss";

const MovieContentReview = ({ content, author_details }: MovieReview) => {
  const [isReadMore, setIsReadMore] = useState<boolean>(false);
  const isLongContent = content && content.length > 200;

  const handleReadMoreClick = () => setIsReadMore(!isReadMore);

  return (
    <>
      <Avatar
        className={styles["movie-review__item-avatar"]}
        icon={
          author_details?.avatar_path ? (
            <Image
              alt=""
              fill
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${author_details.avatar_path}`}
            />
          ) : (
            <UserOutlined />
          )
        }
      />
      <div className={styles["movie-review__item-content"]}>
        <h3 className={styles["movie-review__item-author"]}>
          {author_details?.name}
        </h3>
        <p className={styles["movie-review__item-description"]}>
          {content && (isReadMore || !isLongContent)
            ? content
            : `${content?.substring(0, 200)}...`}
          {isLongContent && (
            <button
              className={styles["movie-review__item-text-toggle"]}
              onClick={handleReadMoreClick}
              type="button"
            >
              <span>{isReadMore ? "Collapse" : "Read more"}</span>
            </button>
          )}
        </p>
      </div>
      <div className={styles["movie-review__item-rating"]}>
        {author_details?.rating && (
          <Rating defaultValue={author_details.rating} small />
        )}
      </div>
    </>
  );
};

export default MovieContentReview;
