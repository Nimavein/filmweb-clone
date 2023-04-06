import React from "react";
import { Backdrop } from "@/types/types";
import Image from "next/image";

const MovieImagesListItem = ({ file_path, height, width }: Backdrop) => {
  return height && width && file_path ? (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${file_path}`}
      alt=""
      height={216}
      width={384}
    />
  ) : (
    <></>
  );
};

export default MovieImagesListItem;
