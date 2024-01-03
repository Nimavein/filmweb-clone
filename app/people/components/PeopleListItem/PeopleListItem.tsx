import Image from "next/image";
import styles from "./PeopleListItem.module.scss";
import Link from "next/link";
import { PeopleResult } from "@/types/types";
import { getDepartmentName } from "@/helpers/getDepartmentName";
import getMediaName from "@/helpers/getName";
import getHref from "@/helpers/getHref";

const PeopleListItem = ({
  id,
  name,
  profile_path,
  known_for_department,
  known_for,
}: PeopleResult) => {
  const knownForText = known_for?.map((show) => getMediaName(show)).join(", ");
  return (
    <Link href={getHref("person", name, id)}>
      <div className={styles["people-list__item"]}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${profile_path}`}
          alt=""
          width={133}
          height={200}
          className={styles["people-list__item-cover"]}
        />
        <div className={styles["people-list__item-content"]}>
          <div className={styles["people-list__item-text"]}>
            <h2 className={styles["people-list__item-title"]}>{name}</h2>
            <p className={styles["people-list__item-department"]}>
              {getDepartmentName(known_for_department)}
            </p>
            <p className={styles["people-list__item-known-for"]}>
              {knownForText}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PeopleListItem;
