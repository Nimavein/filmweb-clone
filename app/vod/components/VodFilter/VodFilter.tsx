import React from "react";
import styles from "./VodFilter.module.scss";
import sectionStyles from "../Vod.module.scss";
import { useAppSelector } from "@/store";
import { Divider } from "antd";
import VodFilterProviders from "./VodFilterProviders/VodFilterProviders";
import VodFilterSort from "./VodFilterSort/VodFilterSort";

const VodFilter = () => {
  const { tv, movies, filters } = useAppSelector((state) => state.watchProviders);

  const chosenProviderName = tv?.results
    ?.find((provider) => provider.provider_id === filters?.watchProviderId)
    ?.provider_name?.toUpperCase();

  return (
    <section className={`${sectionStyles["vod-section"]} ${styles["vod-filter"]}`}>
      <h1 className={styles["vod-filter__header"]}>
        {`Available content on ${chosenProviderName || "platforms"}`}
      </h1>
      {tv?.results && movies?.results && <VodFilterProviders />}
      {tv?.results && movies?.results && <VodFilterSort />}
      <Divider />
    </section>
  );
};

export default VodFilter;
