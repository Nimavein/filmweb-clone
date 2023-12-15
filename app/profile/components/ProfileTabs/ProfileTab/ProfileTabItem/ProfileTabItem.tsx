import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import Image from "next/image";
import Link from "next/link";

import styles from "../../../../Profile.module.scss";

interface ProfileTabItemProps {
  linkUrl: string;
  imagePath: string | undefined | null;
  title: string;
}

const ProfileTabItem = ({ linkUrl, imagePath, title }: ProfileTabItemProps) => {
  const imageHeight = 180;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link className={styles["profile-tab__item"]} href={linkUrl}>
      {imagePath ? (
        <Image
          alt=""
          width={imageWidth}
          height={imageHeight}
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${imagePath}`}
        />
      ) : (
        <ImagePlaceholder
          width={imageWidth}
          height={imageHeight}
          type="image"
        />
      )}
      {title}
    </Link>
  );
};

export default ProfileTabItem;
