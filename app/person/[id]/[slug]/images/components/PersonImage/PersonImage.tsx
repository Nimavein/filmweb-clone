import React from "react";
import Image from "next/image";
import { MainImage } from "@/types/types";

const PersonImage = ({ file_path, aspect_ratio }: MainImage) => {
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
