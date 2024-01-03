import React from "react";
import styles from "./MovieReview.module.scss";
import ReadMoreText from "@/components/ReadMoreText/ReadMoreText";
import Rating from "@/components/Rating/Rating";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import Image from "next/image";
import { Images, Review } from "@/types/types";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";

type MovieReviewProps = Review & {
  slideId: number;
  movieImages: Images;
};

const MovieReview = ({
  content,
  author_details,
  slideId,
  movieImages,
}: MovieReviewProps) => {
  const imageHeight = 168;
  const imageWidth = imageHeight * 1.667;

  return (
    <div className={styles["movie-review"]}>
      {movieImages?.backdrops &&
      movieImages.backdrops[slideId].file_path &&
      movieImages.backdrops[slideId].aspect_ratio ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movieImages?.backdrops[slideId]?.file_path}`}
          alt=""
          width={
            imageHeight * movieImages.backdrops[slideId].aspect_ratio! ||
            imageWidth
          }
          height={imageHeight}
        />
      ) : (
        <ImagePlaceholder
          width={imageWidth}
          height={imageHeight}
          type="image"
        />
      )}
      <div>
        {content && (
          <ReadMoreText
            textClassName={styles["movie-review__text"]}
            text={content}
            showTextLength={500}
          />
        )}
        <div className={styles["movie-review__user"]}>
          <UserAvatar avatarPath={author_details?.avatar_path} />
          <div className={styles["movie-review__user-wrapper"]}>
            <span className={styles["movie-review__user-name"]}>
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

export default MovieReview;
