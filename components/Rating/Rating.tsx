"use client";

import React from "react";
import { Rate } from "antd";
import { StarFilled } from "@ant-design/icons";
import styles from "./Rating.module.scss";

interface RatingProps {
  allowHalf?: boolean;
  disabled?: boolean;
  defaultValue: number;
  starCount?: number;
  small?: boolean;
  fontSize?: number;
  showNumber?: boolean;
  voteCount?: number;
  vertical?: boolean;
}

const Rating = ({
  allowHalf = true,
  disabled = false,
  defaultValue = 0,
  starCount = 10,
  small = false,
  fontSize,
  showNumber = false,
  voteCount,
  vertical = false,
}: RatingProps) => {
  const transformedDefaultValue = defaultValue.toString().substring(0, 4);
  return small ? (
    <div
      className={`${styles["small-rating"]} ${
        vertical ? styles["small-rating--vertical"] : ""
      }`}
      style={{ fontSize: fontSize }}
    >
      <StarFilled className={styles["small-rating__icon"]} />
      <span className={styles["small-rating__value"]}>
        {transformedDefaultValue}
      </span>
      <div className={styles["small-rating__votes"]}>
        <span className={styles["small-rating__votes-value"]}>{voteCount}</span>
        <span className={styles["small-rating__votes-title"]}>votes</span>
      </div>
    </div>
  ) : (
    <div className={styles["rating"]}>
      {showNumber && (
        <span className={styles["rating__value"]}>
          {transformedDefaultValue}
        </span>
      )}
      <Rate
        count={starCount}
        allowHalf={allowHalf}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Rating;
