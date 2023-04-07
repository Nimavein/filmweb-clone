import React from "react";
import { CastMember } from "@/types/types";
import Image from "next/image";
import styles from "../MovieContentCreditsCarousel.module.scss";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const MovieContentCreditsCarouselCastMember = ({
  name,
  profile_path,
  character,
  id,
}: CastMember) => {
  const imageHeight = 240;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link href={`/person/${id}`}>
      <div className={styles["credits-carousel__person"]}>
        {profile_path ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${profile_path}`}
            alt=""
            height={imageHeight}
            width={imageWidth}
            className={styles["credits-carousel__person-image"]}
          />
        ) : (
          <div className={styles["credits-carousel__person-image-placeholder"]}>
            <Avatar size="large" shape="square" icon={<UserOutlined />} />
          </div>
        )}
        <p className={styles["credits-carousel__person-name"]}>{name}</p>
        <p className={styles["credits-carousel__person-character"]}>
          {character}
        </p>
      </div>
    </Link>
  );
};

export default MovieContentCreditsCarouselCastMember;
