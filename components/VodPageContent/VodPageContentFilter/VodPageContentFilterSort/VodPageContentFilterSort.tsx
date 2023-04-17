import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "../VodPageContentFilter.module.scss";
import { fetchWatchProviderMovies } from "@/store/moviesSlice";
import { fetchWatchProviderTvSeries } from "@/store/tvSeriesSlice";
import { setFilterBy } from "@/store/watchProvidersSlice";

const VodPageContentFilterSort = () => {
  const dispatch = useAppDispatch();

  const { filters } = useAppSelector((state) => state.watchProviders);

  const onDiscoverOptionClick = (filterBy: string) => {
    dispatch(setFilterBy(filterBy));
    dispatch(fetchWatchProviderMovies({ page: 1, providerId: filters?.watchProviderId, filterBy }));
    dispatch(
      fetchWatchProviderTvSeries({ page: 1, providerId: filters?.watchProviderId, filterBy })
    );
  };

  const sortOptions = [
    { name: "Popular", value: "popularity.desc" },
    { name: "New", value: "release_date.desc" },
    { name: "Most Profitable", value: "revenue.desc" },
    { name: "Top Rated", value: "vote_average.desc" },
  ];

  return (
    <ul className={styles["vod-page-content__filter-sort"]}>
      {sortOptions.map((option) => (
        <li key={option.name} className={styles["vod-page-content__filter-sort-option"]}>
          <label className={styles["vod-page-content__filter-sort-option-label"]}>
            <input
              type="radio"
              name="sort option"
              value={option.value}
              checked={filters.filterBy === option.value}
              onChange={() => onDiscoverOptionClick(option.value)}
              className={styles["vod-page-content__filter-sort-option-input"]}
            />
            <span className={styles["vod-page-content__filter-sort-option-name"]}>
              {option.name}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default VodPageContentFilterSort;
