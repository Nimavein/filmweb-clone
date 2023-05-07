import React, { useState } from "react";
import RankingContentFilter from "./RankingContentFilter/RankingContentFilter";
import { ActiveRankingFilters, RankingContentType } from "@/types/types";

interface RankingContentFiltersProps {
  contentType: RankingContentType;
}

export interface RankingFilter {
  name: "Original Language" | "Genre" | "Production Year";
  values: { label: string; value: string | number }[];
}

const RankingContentFilters = ({ contentType }: RankingContentFiltersProps) => {
  const [activeFilters, setActiveFilters] = useState<ActiveRankingFilters>({
    originalLanguage: "",
    genre: "",
    productionYear: null,
  });

  const filters: RankingFilter[] = [
    {
      name: "Original Language",
      values: [
        { label: "English", value: "en" },
        { label: "German", value: "de" },
        { label: "Spanish", value: "es" },
        { label: "Polish", value: "pl" },
      ],
    },
    {
      name: "Genre",
      values: [
        { label: "Poland", value: "pl" },
        { label: "USA", value: "us" },
        { label: "United Kingdom", value: "uk" },
      ],
    },
    {
      name: "Production Year",
      values: [
        { label: "2023", value: 2023 },
        { label: "2022", value: 2022 },
        { label: "2021", value: 2021 },
      ],
    },
  ];
  return (
    <ul>
      {filters.map((filter: RankingFilter) => (
        <li key={filter.name}>
          <RankingContentFilter
            filter={filter}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            contentType={contentType}
          />
        </li>
      ))}
    </ul>
  );
};

export default RankingContentFilters;
