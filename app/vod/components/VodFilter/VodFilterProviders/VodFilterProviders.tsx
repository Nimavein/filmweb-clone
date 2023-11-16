"use client";

import React from "react";
import Image from "next/image";
import styles from "../VodFilter.module.scss";
import Button from "@/components/Button/Button";
import { getWatchProviderMovies, getWatchProviderTvSeries } from "@/apiHelpers";
import { GetWatchProviders, WatchProvidersFiltersType } from "@/types/types";
import useSearchParam from "@/hooks/useSearchParam";

interface VodFilterProvidersProps {
  filters: WatchProvidersFiltersType;
  tvProviders: GetWatchProviders;
}

const VodFilterProviders = ({
  filters,
  tvProviders,
}: VodFilterProvidersProps) => {
  const { setSearchParam } = useSearchParam();
  const sortBy = filters?.sortBy || "";

  const onProviderClick = (providerId: number) => {
    setSearchParam("watchProvider", providerId.toString());
    getWatchProviderMovies(1, providerId, sortBy);
    getWatchProviderTvSeries(1, providerId, sortBy);
  };

  return (
    <ul className={styles["vod-filter__providers"]}>
      {tvProviders?.results
        .filter(
          (provider) =>
            provider.display_priority && provider.display_priority < 5
        )
        .map((provider) => (
          <li
            key={provider.provider_id}
            className={styles["vod-filter__provider"]}
          >
            <Button
              disabled={filters.watchProviderId === provider.provider_id}
              active={filters.watchProviderId === provider.provider_id}
              ariaLabel={provider.provider_name}
              onClick={() => onProviderClick(provider.provider_id)}
            >
              <Image
                alt=""
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${provider.logo_path}`}
                width={30}
                height={22}
              />
            </Button>
          </li>
        ))}
    </ul>
  );
};

export default VodFilterProviders;
