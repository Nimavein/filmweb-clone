import React from "react";
import { Profile } from "@/types/types";
import Image from "next/image";

const PersonImagesListItem = ({ file_path, height, width, aspect_ratio }: Profile) => {
  const imageHeight = 400;
  return height && width && file_path && aspect_ratio ? (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${file_path}`}
      alt=""
      height={imageHeight}
      width={imageHeight * aspect_ratio}
    />
  ) : (
    <></>
  );
};

export default PersonImagesListItem;
