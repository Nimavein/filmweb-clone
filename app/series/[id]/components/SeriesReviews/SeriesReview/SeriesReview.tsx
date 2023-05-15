import React from "react";
import styles from "./SeriesReview.module.scss";
import ReadMoreText from "@/components/ReadMoreText/ReadMoreText";
import Rating from "@/components/Rating/Rating";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import Image from "next/image";
import { useAppSelector } from "@/store";
import { Review } from "@/types/types";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";

type SeriesReviewType = Review & {
  slideId: number;
};

const SeriesReview = ({
  content,
  author_details,
  slideId,
}: SeriesReviewType) => {
  const images = useAppSelector((state) => state.series.details?.images);
  const imageHeight = 168;
  const imageWidth = imageHeight * 1.667;

  return (
    <div className={styles["series-review"]}>
      {images?.backdrops &&
      images.backdrops[slideId].file_path &&
      images.backdrops[slideId].aspect_ratio ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${images.backdrops[slideId]?.file_path}`}
          alt=""
          width={
            imageHeight * images.backdrops[slideId].aspect_ratio! || imageWidth
          }
          height={imageHeight}
        />
      ) : (
        <ImagePlaceholder height={imageHeight} width={imageWidth} />
      )}
      <div>
        {content && (
          <ReadMoreText
            textClassName={styles["series-review__text"]}
            text={content}
            showTextLength={500}
          />
        )}
        <div className={styles["series-review__user"]}>
          <UserAvatar avatarPath={author_details?.avatar_path} />
          <div className={styles["series-review__user-wrapper"]}>
            <span className={styles["series-review__user-name"]}>
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

export default SeriesReview;
