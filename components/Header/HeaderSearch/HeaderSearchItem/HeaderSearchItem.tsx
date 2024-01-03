import Image from "next/image";
import Link from "next/link";
import React from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import { MovieDetails, SeriesDetails, PersonDetails } from "@/types/types";
import styles from "../HeaderSearch.module.scss";
import getName from "@/helpers/getName";
import getHref from "@/helpers/getHref";

const HeaderSearchItem = (
  result: MovieDetails | SeriesDetails | PersonDetails
) => {
  const mediaType = result.media_type;
  const id = result.id;
  const imagePath =
    "poster_path" in result
      ? result.poster_path
      : "profile_path" in result && result.profile_path;
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${imagePath}`;
  const dropdownImageHeight = 60;
  const dropdownImageWidth = dropdownImageHeight * 0.667;

  return (
    <Link
      className={styles["header-search__item"]}
      key={id}
      href={getHref(mediaType, getName(result), id)}
    >
      {imagePath ? (
        <Image
          alt=""
          width={dropdownImageWidth}
          height={dropdownImageHeight}
          src={imageUrl}
        />
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

export default HeaderSearchItem;
