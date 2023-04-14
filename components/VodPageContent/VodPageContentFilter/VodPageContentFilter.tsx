import React from "react";
import styles from "./VodPageContentFilter.module.scss";
import { useAppSelector } from "@/store";
import VodPageContentFilterProviders from "./VodPageContentFilterProviders/VodPageContentFilterProviders";

interface ContentFilters {
  watchProviderId: number | null;
  filterBy: string | null;
}

const VodPageContentFilter = () => {
  const { tv, movies } = useAppSelector((state) => state.watchProviders);

  return (
    <section className={styles["vod-page-content__filter"]}>
      VodPageContentList
      {tv?.results && movies?.results && <VodPageContentFilterProviders />}
    </section>
  );
};

export default VodPageContentFilter;
