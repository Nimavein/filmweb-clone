import React from "react";
import { Backdrop } from "@/types/types";
import Image from "next/image";

const MovieContentImage = ({ file_path, height, width, aspect_ratio }: Backdrop) => {
  const imageHeight = 108;
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

export default MovieContentImage;
