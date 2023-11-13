import React from "react";
import { Select } from "antd";
import { RankingFilterType } from "../RankingFilters";
import useSearchParam from "@/hooks/useSearchParam";
import { ActiveRankingFilters } from "@/types/types";
interface RankingFilterProps {
  filter: RankingFilterType;
  activeFilters: ActiveRankingFilters;
}

const RankingFilter = ({ filter, activeFilters }: RankingFilterProps) => {
  const { setSearchParam } = useSearchParam();
  const onChange = (value: string) => {
    setSearchParam(filter?.name, value);
  };

  return (
    <Select
      showSearch
      placeholder={filter?.label}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={filter?.values}
      defaultValue={activeFilters[filter?.name]?.toString()}
    />
  );
};

export default RankingFilter;
