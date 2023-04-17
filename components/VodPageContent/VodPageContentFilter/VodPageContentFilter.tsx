import React from "react";
import styles from "./VodPageContentFilter.module.scss";
import sectionStyles from "../VodPageContent.module.scss";
import { useAppSelector } from "@/store";
import VodPageContentFilterProviders from "./VodPageContentFilterProviders/VodPageContentFilterProviders";
import VodPageContentFilterSort from "./VodPageContentFilterSort/VodPageContentFilterSort";
import { Divider } from "antd";

const VodPageContentFilter = () => {
  const { tv, movies, filters } = useAppSelector((state) => state.watchProviders);

  const chosenProviderName = tv?.results
    ?.find((provider) => provider.provider_id === filters?.watchProviderId)
    ?.provider_name?.toUpperCase();

  return (
    <section
      className={`${sectionStyles["vod-page-content__section"]} ${styles["vod-page-content__filter"]}`}
    >
      <h1 className={styles["vod-page-content__section-header"]}>
        {`Available content on ${chosenProviderName || "platforms"}`}
      </h1>
      {tv?.results && movies?.results && <VodPageContentFilterProviders />}
      {tv?.results && movies?.results && <VodPageContentFilterSort />}
      <Divider />
    </section>
  );
};

export default VodPageContentFilter;
