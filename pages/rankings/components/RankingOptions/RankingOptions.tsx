import React from "react";
import { RankingContentType, RankingSort, RankingSortOption } from "@/types/types";
import styles from "../Rankings.module.scss";
import { fetchMoviesRankingData, fetchTvSeriesRankingData, setSortBy } from "@/store/rankingSlice";
import { useAppDispatch, useAppSelector } from "@/store";

interface RankingOptionsProps {
  options: RankingSortOption[];
  contentType: RankingContentType;
}

const RankingOptions = ({ options, contentType }: RankingOptionsProps) => {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.ranking);

  const onOptionClick = async (value: RankingSort) => {
    dispatch(setSortBy(value));
    if (contentType === "movies") {
      await dispatch(fetchMoviesRankingData({ sortBy: value }));
    } else if (contentType === "tv-series") {
      await dispatch(fetchTvSeriesRankingData({ sortBy: value }));
    }
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

export default RankingOptions;
