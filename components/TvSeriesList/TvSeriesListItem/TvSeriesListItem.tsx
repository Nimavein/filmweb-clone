import Image from "next/image";
import styles from "./TvSeriesListItem.module.scss";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";
import { Series } from "@/types/types";

const TvSeriesListItem = ({
  name,
  overview,
  poster_path,
  id,
  vote_count,
  vote_average,
}: Series) => {
  return (
    <Link href={`/series/${id}`}>
      <div className={styles["tv-series-list__item"]}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
          alt=""
          width={200}
          height={200}
          className={styles["tv-series-list__item-cover"]}
        />
        <div className={styles["tv-series-list__item-content"]}>
          <div className={styles["tv-series-list__item-text"]}>
            <h2 className={styles["tv-series-list__item-title"]}>{name}</h2>
            <p className={styles["tv-series-list__item-overview"]}>{overview}</p>
          </div>
          <div className={styles["tv-series-list__item-rating"]}>
            <span className={styles["tv-series-list__item-vote-average"]}>
              <Rating small defaultValue={vote_average || 0} />
            </span>
            <span
              className={styles["tv-series-list__item-vote-count"]}
            >{`${vote_count} votes`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TvSeriesListItem;
