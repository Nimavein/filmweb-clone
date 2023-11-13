"use client";

import React from "react";
import { RankingSort, RankingSortOption } from "@/types/types";
import styles from "../../Rankings.module.scss";
import useSearchParam from "@/hooks/useSearchParam";

interface RankingOptionsProps {
  options: RankingSortOption[];
  sortBy: string;
}

const RankingOptions = ({ options, sortBy }: RankingOptionsProps) => {
  const { setSearchParam } = useSearchParam();

  const onOptionClick = async (value: RankingSort) => {
    setSearchParam("sortBy", value);
  };

  return (
    <ul className={styles["ranking-types"]}>
      {options?.map((option) => (
        <li key={option.label} className={styles["ranking-type"]}>
          <label
            className={`${styles["ranking-type__label"]} ${
              sortBy === option.value
                ? styles["ranking-type__label--active"]
                : ""
            }`}
          >
            <input
              type="radio"
              name="tv series ranking option"
              value={option.value}
              checked={sortBy === option.value}
              onChange={() => onOptionClick(option.value)}
              className={styles["ranking-type__input"]}
            />
            <span className={styles["ranking-type__name"]}>{option.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RankingOptions;
