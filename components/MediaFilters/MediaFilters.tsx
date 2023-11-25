"use client";

import React, { useState } from "react";
import { ActiveMediaFiltersType, FiltersContentType, GenresDTO } from "@/types/types";
import { CloseOutlined, FilterOutlined } from "@ant-design/icons";
import Button from "@/components/Button/Button";
import MediaFilter from "./MediaFilter/MediaFilter";
import useSWR from "swr";
import { moviesApi, tvSeriesApi } from "@/apiHelpers/urlHelper";
import { Select } from "antd";
import useSearchParam from "@/hooks/useSearchParam";
import { getMediaFilters, mediaFiltersSortOptions } from "./mediaFiltersData";

import styles from "./MediaFilters.module.scss";

interface MediaFiltersProps {
  contentType: FiltersContentType;
  activeFilters: ActiveMediaFiltersType;
  sortBy: string;
}

const baseCSSClassName = "media-filters";

const MediaFilters = ({ activeFilters, contentType, sortBy }: MediaFiltersProps) => {
  const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);
  const { setSearchParam } = useSearchParam();

  const { data: genresData } = useSWR<GenresDTO>(
    contentType === "movies" ? moviesApi.getMoviesGenres() : tvSeriesApi.getTvSeriesGenres()
  );
  const genres = genresData?.genres;
  const mediaFilters = getMediaFilters(genres || []);

  const closeSidebar = () => {
    setAreFiltersOpen(false);
  };

  const onSortChange = (value: string) => {
    setSearchParam("sortBy", value);
  };

  const defaultSortLabel = mediaFiltersSortOptions
    .flatMap((optionGroup) => optionGroup.options)
    .find((option) => option.value === sortBy)?.label;

  return (
    <>
      <div className={styles[`${baseCSSClassName}__controls`]}>
        <Select
          showSearch
          placeholder="Sort by"
          optionFilterProp="children"
          onChange={onSortChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: "200px" }}
          options={mediaFiltersSortOptions}
          defaultValue={defaultSortLabel}
          size="large"
        />
        <Button
          ariaLabel={areFiltersOpen ? "Close filters" : "Open filters"}
          active={areFiltersOpen}
          onClick={() => setAreFiltersOpen(!areFiltersOpen)}
        >
          <FilterOutlined /> FILTERS
        </Button>
      </div>
      {areFiltersOpen && (
        <div className={styles[`${baseCSSClassName}__backdrop`]} onClick={closeSidebar} />
      )}
      <div
        className={`${styles[`${baseCSSClassName}__sidebar`]} ${
          areFiltersOpen ? styles[`${baseCSSClassName}__sidebar--open`] : ""
        }`}
      >
        <div className={styles[`${baseCSSClassName}__sidebar-top`]}>
          <h2 className={styles[`${baseCSSClassName}__sidebar-title`]}>
            FILTERS:{" "}
            <span className={styles[`${baseCSSClassName}__sidebar-type`]}>{contentType}</span>
          </h2>
          <button
            onClick={closeSidebar}
            aria-label="close filters sidebar"
            className={styles[`${baseCSSClassName}__sidebar-close`]}
          >
            <CloseOutlined />
          </button>
        </div>
        <ul className={styles[`${baseCSSClassName}__list`]}>
          {mediaFilters.map((filter) => (
            <li key={filter.name}>
              <MediaFilter filter={filter} activeFilters={activeFilters} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MediaFilters;
