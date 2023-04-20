import React from "react";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import { getSearchResultType } from "@/helpers/getSearchResultType";
import { MovieDetails, SeriesDetails, PersonDetails } from "@/types/types";

const SearchListItem = (result: MovieDetails | SeriesDetails | PersonDetails) => {
  const dropdownImageHeight = 120;
  const dropdownImageWidth = dropdownImageHeight * 0.667;
  const title = "title" in result ? result.title : "name" in result && result.name;
  const mediaType = result.media_type;
  const id = result.id;
  const imagePath =
    "poster_path" in result ? result.poster_path : "profile_path" in result && result.profile_path;
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${imagePath}`;
  const linkUrl = `${getSearchResultType(mediaType)}${id}`;
  return (
    <li>
      <Link key={id} href={linkUrl}>
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
            icon={mediaType === "person" ? <UserOutlined /> : <CameraOutlined />}
          />
        )}
        {title}
      </Link>
    </li>
  );
};

export default SearchListItem;
