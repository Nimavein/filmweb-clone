import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Image from "next/image";

interface UserAvatarProps {
  avatarPath?: string | null;
  avatarClassname?: string;
}

const UserAvatar = ({ avatarPath, avatarClassname }: UserAvatarProps) => {
  return (
    <Avatar
      className={avatarClassname}
      icon={
        avatarPath ? (
          <Image
            alt=""
            fill
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${avatarPath}`}
          />
        ) : (
          <UserOutlined />
        )
      }
    />
  );
};

export default UserAvatar;
