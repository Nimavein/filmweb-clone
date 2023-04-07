import React from "react";
import { CrewMember } from "@/types/types";
import Image from "next/image";
import styles from "../MovieContentCreditsCarousel.module.scss";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const MovieContentCreditsCarouselCrewMember = ({
  name,
  profile_path,
  job,
}: CrewMember) => {
  return (
    <div className={styles["credits-carousel__person"]}>
      {profile_path ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${profile_path}`}
          alt=""
          height={197}
          width={130}
          className={styles["credits-carousel__person-image"]}
        />
      ) : (
        <div className={styles["credits-carousel__person-image-placeholder"]}>
          <Avatar size="large" shape="square" icon={<UserOutlined />} />
        </div>
      )}
      <p className={styles["credits-carousel__person-name"]}>{name}</p>
      <p className={styles["credits-carousel__person-character"]}>{job}</p>
    </div>
  );
};

export default MovieContentCreditsCarouselCrewMember;
