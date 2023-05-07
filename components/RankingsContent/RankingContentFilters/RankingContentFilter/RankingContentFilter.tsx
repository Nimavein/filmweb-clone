import React, { useEffect } from "react";
import { Select } from "antd";
import { RankingFilter } from "../RankingContentFilters";
import { ActiveRankingFilters, RankingContentType } from "@/types/types";
import { useAppDispatch } from "@/store";
import { fetchMoviesRankingData, fetchTvSeriesRankingData } from "@/store/rankingSlice";

interface RankingContentFilterProps {
  filter: RankingFilter;
  activeFilters: ActiveRankingFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveRankingFilters>>;
  contentType: RankingContentType;
}

const RankingContentFilter = ({
  filter,
  activeFilters,
  setActiveFilters,
  contentType,
}: RankingContentFilterProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (contentType === "movies") {
      dispatch(fetchMoviesRankingData({sortBy: "vote_average.desc", filters: activeFilters}));
    } else if (contentType === "tv-series") {
      dispatch(fetchTvSeriesRankingData({ sortBy: "vote_average.desc", filters: activeFilters }));
    }
  }, [activeFilters]);

  const onChange = (value: string) => {
    if (filter.name === "Original Language") {
      setActiveFilters({ ...activeFilters, originalLanguage: value });
    } else if (filter.name === "Genre") {
      setActiveFilters({ ...activeFilters, genre: value });
    } else if (filter.name === "Production Year") {
      setActiveFilters({ ...activeFilters, productionYear: parseInt(value, 10) });
    }
  };

  return (
    <Select
      showSearch
      placeholder={filter.name}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={filter.values}
    />
  );
};

export default RankingContentFilter;
