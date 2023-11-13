"use client";

import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import styles from "./ImagePlaceholder.module.scss";

interface ImagePlaceholderProps {
  className?: string;
  avatarSize?: "default" | "large" | "small";
  avatarShape?: "circle" | "square";
  height: number;
  width: number;
}

const ImagePlaceholder = ({
  className,
  avatarSize = "large",
  avatarShape = "square",
  height,
  width,
}: ImagePlaceholderProps) => {
  return (
    <div
      className={`${className} ${styles["image-placeholder"]}`}
      style={{ height, width }}
    >
      <Avatar size={avatarSize} shape={avatarShape} icon={<UserOutlined />} />
    </div>
  );
};

export default ImagePlaceholder;
