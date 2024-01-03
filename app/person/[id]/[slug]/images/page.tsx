import { getPersonData } from "@/apiHelpers";
import { PageIdParams } from "@/types/types";
import Image from "next/image";

import styles from "./PersonImages.module.scss";

const PersonImages = async ({ params: { id } }: PageIdParams) => {
  const numberId = Number(id);
  const personDetails = await getPersonData(numberId);
  const personImages = personDetails?.images;

  return (
    <main className={styles["person-images"]}>
      <h1
        className={styles["person-images__title"]}
      >{`Images of ${personDetails?.name} (${personImages?.profiles?.length})`}</h1>
      <ul className={styles["person-images__list"]}>
        {personImages?.profiles?.map(
          (image) =>
            image.aspect_ratio &&
            image.file_path && (
              <li
                key={image.file_path}
                className={styles["person-images__list-item"]}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image.file_path}`}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </li>
            )
        )}
      </ul>
    </main>
  );
};

export default PersonImages;
