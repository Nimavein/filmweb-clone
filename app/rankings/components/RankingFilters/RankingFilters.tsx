"use client";

import React, { useState } from "react";
import {
  ActiveRankingFilters,
  GenresDTO,
  RankingContentType,
} from "@/types/types";
import RankingFilter from "./RankingFilter/RankingFilter";
import { FilterOutlined } from "@ant-design/icons";
import Button from "@/components/Button/Button";

interface RankingFiltersProps {
  contentType: RankingContentType;
  activeFilters: ActiveRankingFilters;
  genres: GenresDTO;
}

export interface RankingFilterType {
  label: string;
  name: keyof ActiveRankingFilters;
  values: { label: string; value: string | number }[];
}

const RankingFilters = ({ activeFilters, genres }: RankingFiltersProps) => {
  const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);

  const filters: RankingFilterType[] = [
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
          {filters.map((filter: RankingFilterType) => (
            <li key={filter.name}>
              <RankingFilter filter={filter} activeFilters={activeFilters} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RankingFilters;
