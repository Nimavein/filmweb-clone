import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "../VodPageContentFilter.module.scss";
import { setWatchProviderId } from "@/store/watchProvidersSlice";
import Button from "@/components/Button/Button";
import { fetchWatchProviderMovies } from "@/store/moviesSlice";
import { fetchWatchProviderTvSeries } from "@/store/tvSeriesSlice";

const VodPageContentFilterProviders = () => {
  const dispatch = useAppDispatch();

  const { tv, filters } = useAppSelector((state) => state.watchProviders);

  const onProviderClick = (providerId: number) => {
    dispatch(setWatchProviderId(providerId));
      dispatch(fetchWatchProviderMovies({ page: 1, providerId: providerId }));
      dispatch(fetchWatchProviderTvSeries({ page: 1, providerId: providerId }));
  };

  return (
    <ul className={styles["vod-page-content__filter-providers"]}>
      {tv?.results
        .filter((provider) => provider.display_priority && provider.display_priority < 5)
        .map((provider) => (
          <li key={provider.provider_id} className={styles["vod-page-content__filter-provider"]}>
            <Button
              disabled={filters.watchProviderId === provider.provider_id}
              active={filters.watchProviderId === provider.provider_id}
              ariaLabel={provider.provider_name}
              onClick={() => onProviderClick(provider.provider_id)}
            >
              <Image
                alt=""
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${provider.logo_path}`}
                width={40}
                height={30}
              />
            </Button>
          </li>
        ))}
    </ul>
  );
};

export default VodPageContentFilterProviders;
