import React from "react";
import { MediaType, Movies, TvSeries } from "@/types/types";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import Link from "next/link";
import { getSearchResultType } from "@/helpers/getSearchResultType";

import styles from "../../../Profile.module.scss";

interface ProfileTabProps {
  tvSeries: TvSeries | undefined;
  movies: Movies | undefined;
}

const baseCSSClassName = "profile-tab";

const ProfileTab = ({ tvSeries, movies }: ProfileTabProps) => {
  const imageHeight = 180;
  const imageWidth = imageHeight * 0.667;

  const renderItem = (
    id: number,
    imagePath: string | undefined | null,
    title: string,
    mediaType: MediaType,
    linkUrl: string
  ) => (
    <li key={id}>
      <Link className={styles["profile-tab__item"]} href={linkUrl}>
        {imagePath ? (
          <Image
            alt=""
            width={imageWidth}
            height={imageHeight}
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${imagePath}`}
          />
        ) : (
          <ImagePlaceholder
            width={imageWidth}
            height={imageHeight}
            type="image"
          />
        )}
        {title}
      </Link>
    </li>
  );

  return (
    <div className={styles[baseCSSClassName]}>
      {!!(movies?.total_results && !!(movies?.total_results > 0)) && (
        <div className={styles[`${baseCSSClassName}__movies`]}>
          <h2 className={styles[`${baseCSSClassName}__subheader`]}>Movies</h2>
          <ul className={styles[`${baseCSSClassName}__items`]}>
            {movies?.results?.map((result) =>
              renderItem(
                result.id,
                result.poster_path,
                result?.title,
                "tv",
                `${getSearchResultType("movie")}${result?.id}`
              )
            )}
          </ul>
        </div>
      )}
      {!!(tvSeries?.total_results && tvSeries?.total_results > 0) && (
        <div className={styles[`${baseCSSClassName}__tv-series`]}>
          <h2 className={styles[`${baseCSSClassName}__subheader`]}>TV series</h2>
          <ul className={styles[`${baseCSSClassName}__items`]}>
            {tvSeries?.results?.map((result) =>
              renderItem(
                result.id,
                result.poster_path,
                result?.name,
                "tv",
                `${getSearchResultType("tv")}${result?.id}`
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
