import React from "react";
import { useAppSelector } from "@/store";
import styles from "./SeriesSeasonContentSeasons.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";

const SeriesSeasonContentSeasons = () => {
  const { details, season } = useAppSelector((state) => state.series);

  return (
    <section className={`${styles["series-season-content__seasons"]}`}>
      <ul className={styles["series-season-content__seasons-list"]}>
        {details?.seasons?.map((seasonItem, index) => (
          <li key={index} className={styles["series-season-content__seasons-list-item"]}>
            <Link
              key={seasonItem.name}
              href={`/series/${details?.id}/season/${seasonItem.season_number}`}
            >
              <Button active={seasonItem.season_number === season?.season_number}>{`Season ${
                index + 1
              }`}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SeriesSeasonContentSeasons;
