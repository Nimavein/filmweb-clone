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
}

const Rating = ({
  allowHalf = true,
  disabled = false,
  defaultValue = 0,
  starCount = 10,
  small = false,
  fontSize,
  showNumber = false,
}: RatingProps) =>
  small ? (
    <div className={styles["small-rating"]} style={{ fontSize: fontSize }}>
      <StarFilled className={styles["small-rating__icon"]} />
      <span className={styles["small-rating__value"]}>{defaultValue}</span>
    </div>
  ) : (
    <div className={styles["rating"]}>
      {showNumber && (
        <span className={styles["rating__value"]}>{defaultValue}</span>
      )}
      <Rate
        count={starCount}
        allowHalf={allowHalf}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  );

export default Rating;
