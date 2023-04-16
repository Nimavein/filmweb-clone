import React from "react";
import styles from "./VodPageContentFilter.module.scss";
import sectionStyles from "../VodPageContent.module.scss";
import { useAppSelector } from "@/store";
import VodPageContentFilterProviders from "./VodPageContentFilterProviders/VodPageContentFilterProviders";

const VodPageContentFilter = () => {
  const { tv, movies } = useAppSelector((state) => state.watchProviders);
  return (
    <section
      className={`${styles["vod-page-content__filter"]} ${sectionStyles["vod-page-content__section"]}`}
    >
      {tv?.results && movies?.results && <VodPageContentFilterProviders />}
    </section>
  );
};

export default VodPageContentFilter;
