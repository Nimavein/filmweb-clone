import React from "react";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import { MovieDetails, SeriesDetails, PersonDetails } from "@/types/types";
import getName from "@/helpers/getName";
import getMediaHref from "@/helpers/getMediaHref";

import styles from "../../../Search.module.scss";

const SearchListItem = (
  result: MovieDetails | SeriesDetails | PersonDetails
) => {
  const dropdownImageHeight = 180;
  const dropdownImageWidth = dropdownImageHeight * 0.667;
  const mediaType = result.media_type;
  const id = result.id;
  const imagePath =
    "poster_path" in result
      ? result.poster_path
      : "profile_path" in result && result.profile_path;
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${imagePath}`;
  return (
    <Link className={styles["search-list__item"]} href={getMediaHref(mediaType, id)}>
      {imagePath ? (
        <Image alt="" width={dropdownImageWidth} height={dropdownImageHeight} src={imageUrl} />
      ) : (
        <ImagePlaceholder
          width={dropdownImageWidth}
          height={dropdownImageHeight}
          type={mediaType === "person" ? "person" : "image"}
        />
      )}
      {getName(result)}
    </Link>
  );
};

export default SearchListItem;
