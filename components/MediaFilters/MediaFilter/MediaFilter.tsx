import React from "react";
import { Select } from "antd";
import useSearchParam from "@/hooks/useSearchParam";
import { MediaFilterType } from "../MediaFilters";
import { ActiveMediaFiltersType } from "@/types/types";

interface MediaFilterProps {
  filter: MediaFilterType;
  activeFilters: ActiveMediaFiltersType;
}

const MediaFilter = ({ filter, activeFilters }: MediaFilterProps) => {
  const { setSearchParam, getSearchParam } = useSearchParam();
  const onChange = (value: string) => {
    setSearchParam(filter?.name, value);
    if (getSearchParam("page")) setSearchParam("page", "1");
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

export default MediaFilter;
