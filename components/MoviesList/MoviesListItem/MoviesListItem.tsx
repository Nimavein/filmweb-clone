import Image from "next/image";
import styles from "./MoviesListItem.module.scss";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";
import { Movie } from "@/types/types";

const MoviesListItem = ({
  title,
  overview,
  poster_path,
  id,
  vote_count,
  vote_average,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`}>
      <div className={styles["movies-list__item"]}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
          alt=""
          width={200}
          height={200}
          className={styles["movies-list__item-cover"]}
        />
        <div className={styles["movies-list__item-content"]}>
          <div className={styles["movies-list__item-text"]}>
            <h2 className={styles["movies-list__item-title"]}>{title}</h2>
            <p className={styles["movies-list__item-overview"]}>{overview}</p>
          </div>
          <div className={styles["movies-list__item-rating"]}>
            <span className={styles["movies-list__item-vote-average"]}>
              <Rating small defaultValue={vote_average} />
            </span>
            <span
              className={styles["movies-list__item-vote-count"]}
            >{`${vote_count} votes`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MoviesListItem;
