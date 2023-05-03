import React from "react";
import { RankingSort, RankingSortOption } from "@/types/types";
import styles from "../RankingsContent.module.scss";
import { setSortBy } from "@/store/rankingSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { AsyncThunk } from "@reduxjs/toolkit";

interface RankingContentOptionsProps {
  options: RankingSortOption[];
  fetchRankingData: AsyncThunk<any, RankingSort, any>;
}

const RankingContentOptions = ({ options, fetchRankingData }: RankingContentOptionsProps) => {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.ranking);

  const onOptionClick = async (value: RankingSort) => {
    dispatch(setSortBy(value));
    await dispatch(fetchRankingData(value));
  };

  return (
    <ul className={styles["ranking-types"]}>
      {options.map((option) => (
        <li key={option.label} className={styles["ranking-type"]}>
          <label
            className={`${styles["ranking-type__label"]} ${
              sortBy === option.value ? styles["ranking-type__label--active"] : ""
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

export default RankingContentOptions;
