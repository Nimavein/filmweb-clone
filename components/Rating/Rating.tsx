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
}

const Rating = ({
  allowHalf = true,
  disabled = false,
  defaultValue = 0,
  starCount = 10,
  small = false,
  fontSize,
}: RatingProps) =>
  small ? (
    <div className={styles["small-rating"]} style={{ fontSize: fontSize }}>
      <StarFilled className={styles["small-rating__icon"]} />
      <span className={styles["small-rating__value"]}>{defaultValue}</span>
    </div>
  ) : (
    <Rate
      count={starCount}
      allowHalf={allowHalf}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  );

export default Rating;
