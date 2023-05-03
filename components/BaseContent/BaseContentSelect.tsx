import { Select } from "antd";
import React from "react";

const BaseContentSelect = () => {
    
    const selectOptions = [
      {
        label: "Rating",
        options: [
          { label: "Desc", value: "rating.desc" },
          { label: "Inc", value: "rating.inc" },
        ],
      },
      {
        label: "Popularity",
        options: [
          { label: "Desc", value: "popularity.desc" },
          { label: "Inc", value: "popularity.inc" },
        ],
      },
    ];

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Select
      defaultValue="popularity.desc"
      style={{ width: 200 }}
      onChange={handleChange}
      options={selectOptions}
    />
  );
};

export default BaseContentSelect;
