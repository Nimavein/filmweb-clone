import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Image from "next/image";

interface ProfileAvatarProps {
  avatarPath: string | undefined;
}

const ProfileAvatar = ({ avatarPath }: ProfileAvatarProps) => {
  return (
    <Avatar
      icon={
        avatarPath ? (
          <Image
            width={20}
            height={20}
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${avatarPath}`}
            alt=""
          />
        ) : (
          <UserOutlined style={{ color: "white" }} />
        )
      }
    />
  );
};

export default ProfileAvatar;
