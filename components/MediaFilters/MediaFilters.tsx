"use client";

import React, { useState } from "react";
import {
  ActiveMediaFiltersType,
  FiltersContentType,
  GenresDTO,
} from "@/types/types";
import { FilterOutlined } from "@ant-design/icons";
import Button from "@/components/Button/Button";
import MediaFilter from "./MediaFilter/MediaFilter";

interface MediaFiltersProps {
  contentType: FiltersContentType;
  activeFilters: ActiveMediaFiltersType;
  genres: GenresDTO;
}

export interface MediaFilterType {
  label: string;
  name: keyof ActiveMediaFiltersType;
  values: { label: string; value: string | number }[];
}

const MediaFilters = ({ activeFilters, genres }: MediaFiltersProps) => {
  const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);

  const filters: MediaFilterType[] = [
    {
      label: "Original Language",
      name: "originalLanguage",
      values: [
        { label: "English", value: "en" },
        { label: "German", value: "de" },
        { label: "Spanish", value: "es" },
        { label: "Polish", value: "pl" },
      ],
    },
    {
      label: "Genre",
      name: "genre",
      values:
        genres.map((genre) => ({ label: genre.name, value: genre.id })) || [],
    },
    {
      label: "ProductionYear",
      name: "productionYear",
      values: [
        { label: "2023", value: 2023 },
        { label: "2022", value: 2022 },
        { label: "2021", value: 2021 },
      ],
    },
  ];

  return (
    <>
      <Button
        ariaLabel={areFiltersOpen ? "Close filters" : "Open filters"}
        active={areFiltersOpen}
        onClick={() => setAreFiltersOpen(!areFiltersOpen)}
      >
        <FilterOutlined />
      </Button>
      {areFiltersOpen && (
        <ul>
          {filters.map((filter) => (
            <li key={filter.name}>
              <MediaFilter filter={filter} activeFilters={activeFilters} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MediaFilters;
