"use client";

import React from "react";
import styles from "../VodFilter.module.scss";
import { getWatchProviderMovies, getWatchProviderTvSeries } from "@/api";
import { WatchProvidersFiltersType } from "@/types/types";
import useSearchParam from "@/hooks/useSearchParam";

interface VodFilterSortProps {
  filters: WatchProvidersFiltersType;
}

const VodFilterSort = ({ filters }: VodFilterSortProps) => {
  const watchProviderId = filters?.watchProviderId;
  const { setSearchParam } = useSearchParam();

  const onDiscoverOptionClick = async (sortBy: string) => {
    setSearchParam("sortBy", sortBy);
    await getWatchProviderMovies(1, watchProviderId, sortBy);
    await getWatchProviderTvSeries(1, watchProviderId, sortBy);
  };

  const sortOptions = [
    { name: "Popular", value: "popularity.desc" },
    { name: "New", value: "release_date.desc" },
    { name: "Most Profitable", value: "revenue.desc" },
    { name: "Top Rated", value: "vote_average.desc" },
  ];

  return (
    <ul className={styles["vod-filter__sort"]}>
      {sortOptions.map((option) => (
        <li key={option.name} className={styles["vod-filter__sort-option"]}>
          <label className={styles["vod-filter__sort-option-label"]}>
            <input
              type="radio"
              name="sort option"
              value={option.value}
              checked={filters.sortBy === option.value}
              onChange={() => onDiscoverOptionClick(option.value)}
              className={styles["vod-filter__sort-option-input"]}
            />
            <span className={styles["vod-filter__sort-option-name"]}>
              {option.name}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default VodFilterSort;
