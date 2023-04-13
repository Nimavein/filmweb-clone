import { useAppSelector } from "@/store";
import React from "react";

const SeriesSeasonContent = () => {
  const { details, seasonStatus, season } = useAppSelector((state) => state.series);
  console.log(season);

  return <div>SeriesSeasonContent</div>;
};

export default SeriesSeasonContent;
