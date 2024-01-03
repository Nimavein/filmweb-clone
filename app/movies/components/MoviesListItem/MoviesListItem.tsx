import Image from "next/image";
import styles from "./MoviesListItem.module.scss";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";
import { Movie } from "@/types/types";
import getHref from "@/helpers/getHref";

const MoviesListItem = ({
  title,
  overview,
  poster_path,
  id,
  vote_count,
  vote_average,
  release_date,
}: Movie) => {
  const imageHeight = 200;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link href={getHref("movie", title, id)}>
      <div className={styles["movies-list__item"]}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
          alt=""
          width={imageWidth}
          height={imageHeight}
          className={styles["movies-list__item-cover"]}
        />
        <div className={styles["movies-list__item-content"]}>
          <div className={styles["movies-list__item-text"]}>
            <h2
              className={styles["movies-list__item-title"]}
            >{`${title} (${release_date.substring(0, 4)})`}</h2>
            <p className={styles["movies-list__item-overview"]}>{overview}</p>
          </div>
          <div className={styles["movies-list__item-rating"]}>
            <span className={styles["movies-list__item-vote-average"]}>
              <Rating
                vertical
                small
                defaultValue={vote_average}
                voteCount={vote_count}
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MoviesListItem;
