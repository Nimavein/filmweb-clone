import React from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "../VodPageContentFilter.module.scss";
import { setWatchProviderId } from "@/store/watchProvidersSlice";
import Button from "@/components/Button/Button";



const VodPageContentFilterProviders = () => {
  const dispatch = useAppDispatch();

    
  const { tv, movies } = useAppSelector((state) => state.watchProviders);

  const onProviderClick = (providerId: number) => {
    dispatch(setWatchProviderId(providerId));
  };
  
  return (
    <ul className={styles["vod-page-content__filter-providers"]}>
      {tv?.results
        .filter((provider) => provider.display_priority && provider.display_priority < 5)
        .map((provider) => (
          <li key={provider.provider_id} className={styles["vod-page-content__filter-provider"]}>
            <Button
              ariaLabel={ provider.provider_name}
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
