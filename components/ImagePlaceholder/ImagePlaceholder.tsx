"use client";

import React, { ReactNode } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import styles from "./ImagePlaceholder.module.scss";

interface ImagePlaceholderProps {
  className?: string;
  avatarSize?: "default" | "large" | "small";
  icon?: ReactNode;
  avatarShape?: "circle" | "square";
  height: number;
  width: number;
}

const ImagePlaceholder = ({
  className,
  avatarSize = "large",
  avatarShape = "square",
  icon = <UserOutlined />,
  height,
  width,
}: ImagePlaceholderProps) => {
  return (
    <div
      className={`${className} ${styles["image-placeholder"]}`}
      style={{ height, width }}
    >
      <Avatar size={avatarSize} shape={avatarShape} icon={icon} />
    </div>
  );
};

export default ImagePlaceholder;
