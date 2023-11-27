import React from "react";
import { Select } from "antd";
import useSearchParam from "@/hooks/useSearchParam";
import { ActiveMediaFiltersType, MediaFilterType } from "@/types/types";
import Divider from "@/components/Divider/Divider";

import styles from "../MediaFilters.module.scss";

interface MediaFilterProps {
  filter: MediaFilterType;
  activeFilters: ActiveMediaFiltersType;
}

const MediaFilter = ({ filter, activeFilters }: MediaFilterProps) => {
  const { setSearchParam, getSearchParam, removeSearchParam } =
    useSearchParam();
  const onChange = (value: string[]) => {
    value.length === 0
      ? removeSearchParam(filter?.name)
      : setSearchParam(filter?.name, value);
    if (getSearchParam("page")) setSearchParam("page", "1");
  };

  return (
    <>
      <Divider />
      <div className={styles["media-filters__filter"]}>
        <p>{filter?.label}</p>
        <Select
          mode="multiple"
          showSearch
          placeholder={filter?.label}
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: "100%" }}
          options={filter?.values}
          value={activeFilters[filter?.name]}
        />
      </div>
    </>
  );
};

export default MediaFilter;
