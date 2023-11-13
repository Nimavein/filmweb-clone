import React from "react";
import { Profile } from "@/types/types";
import Image from "next/image";

const PersonImage = ({ file_path, aspect_ratio }: Profile) => {
  const imageHeight = 400;
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${file_path}`}
      alt=""
      height={imageHeight}
      width={imageHeight * (aspect_ratio || 1)}
    />
  )
};

export default PersonImage;
