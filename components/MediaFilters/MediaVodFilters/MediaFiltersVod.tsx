"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { ActiveMediaFiltersType, GetWatchProviders } from "@/types/types";
import useSearchParam from "@/hooks/useSearchParam";

import styles from "../MediaFilters.module.scss";
import Divider from "@/components/Divider/Divider";

interface MediaFiltersVodProps {
  activeFilters: ActiveMediaFiltersType;
  providers: GetWatchProviders;
}

const MediaFiltersVod = ({
  activeFilters,
  providers,
}: MediaFiltersVodProps) => {
  const { setSearchParam, removeSearchParam } = useSearchParam();
  const providersToDisplay = (providers?.results || [])
    .filter(
      (provider) =>
        provider.display_priority !== undefined &&
        provider.display_priority < 10
    )
    .sort((a, b) => (a.display_priority || 0) - (b.display_priority || 0));

  const onProviderClick = (providerId: number) => {
    const providerString = providerId.toString();
    const providers = activeFilters?.providers || [];

    const isProviderActive = providers.includes(providerString);
    const updatedProviders = isProviderActive
      ? providers.filter((filterProvider) => filterProvider !== providerString)
      : [...providers, providerString];

    if (updatedProviders.length > 0) {
      setSearchParam("watchProviders", updatedProviders);
    } else {
      removeSearchParam("watchProviders");
    }
  };

  return (
    <>
      <Divider />
      <p>Streaming platforms</p>
      <ul className={styles["media-filters__vod"]}>
        {providersToDisplay.map((provider) => (
          <li
            key={provider.provider_id}
            className={styles["media-filters__vod-item"]}
          >
            <Button
              active={activeFilters?.providers?.includes(
                provider.provider_id.toString()
              )}
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
    </>
  );
};

export default MediaFiltersVod;
