import Image from "next/image";
import styles from "./TvSeriesListItem.module.scss";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";
import { Series } from "@/types/types";
import getHref from "@/helpers/getHref";

const TvSeriesListItem = ({
  name,
  overview,
  poster_path,
  id,
  vote_count,
  vote_average,
  first_air_date
}: Series) => {
  const imageHeight = 200;
  const imageWidth = imageHeight * 0.667;
  return (
    <Link href={getHref("tv", name, id)}>
      <div className={styles["tv-series-list__item"]}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
          alt=""
          width={imageWidth}
          height={imageHeight}
          className={styles["tv-series-list__item-cover"]}
        />
        <div className={styles["tv-series-list__item-content"]}>
          <div className={styles["tv-series-list__item-text"]}>
            <h2
              className={styles["tv-series-list__item-title"]}
            >{`${name} (${first_air_date?.substring(0, 4)})`}</h2>
            <p className={styles["tv-series-list__item-overview"]}>{overview}</p>
          </div>
          <div className={styles["tv-series-list__item-rating"]}>
            <div className={styles["tv-series-list__item-vote-average"]}>
              <Rating vertical small defaultValue={vote_average || 0} voteCount={vote_count} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TvSeriesListItem;
