import { getPersonData } from "@/apiHelpers";
import { PageIdParams } from "@/types/types";
import PersonImage from "./components/PersonImage/PersonImage";

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
                <PersonImage {...image} />
              </li>
            )
        )}
      </ul>
    </main>
  );
};

export default PersonImages;
