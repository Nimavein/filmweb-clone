import React from "react";
import styles from "./VodFilter.module.scss";
import VodFilterProviders from "./VodFilterProviders/VodFilterProviders";
import VodFilterSort from "./VodFilterSort/VodFilterSort";
import { GetWatchProviders, WatchProvidersFiltersType } from "@/types/types";

interface VodFilterProps {
  tvProviders: GetWatchProviders;
  moviesProviders: GetWatchProviders;
  filters: WatchProvidersFiltersType;
}

const VodFilter = ({
  tvProviders,
  moviesProviders,
  filters,
}: VodFilterProps) => {
  const areProvidersAvailable =
    tvProviders?.results && moviesProviders?.results;

  const chosenProviderName = tvProviders?.results
    ?.find((provider) => provider.provider_id === filters?.watchProviderId)
    ?.provider_name?.toUpperCase();

  return (
    <section className={styles["vod-filter"]}>
      <h1 className={styles["vod-filter__header"]}>
        {`Available content on ${chosenProviderName || "platforms"}`}
      </h1>
      {areProvidersAvailable && (
        <>
          <VodFilterProviders filters={filters} tvProviders={tvProviders} />
          <VodFilterSort filters={filters} />
        </>
      )}
    </section>
  );
};

export default VodFilter;
