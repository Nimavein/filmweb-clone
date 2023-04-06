import React from "react";
import { Backdrop } from "@/types/types";
import Image from "next/image";
import styles from "../MovieContentImages.module.scss";

const MovieContentImage = ({ file_path, height, width }: Backdrop) => {
  return height && width && file_path ? (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${file_path}`}
      alt=""
      height={108}
      width={197}
      className={styles["movie-content__images-image"]}
    />
  ) : (
    <></>
  );
};

export default MovieContentImage;
