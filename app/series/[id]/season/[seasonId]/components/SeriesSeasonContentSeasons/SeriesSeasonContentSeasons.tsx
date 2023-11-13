import React from "react";
import styles from "./SeriesSeasonContentSeasons.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { SeriesDetails, SeasonDetails } from "@/types/types";

interface SeriesSeasonContentSeasonsProps {
  seriesDetails: SeriesDetails;
  seasonDetails: SeasonDetails;
}

const SeriesSeasonContentSeasons = ({
  seasonDetails,
  seriesDetails,
}: SeriesSeasonContentSeasonsProps) => {
  return (
    <section className={`${styles["series-season-content__seasons"]}`}>
      <ul className={styles["series-season-content__seasons-list"]}>
        {seriesDetails?.seasons?.map((seasonItem, index) => (
          <li
            key={index}
            className={styles["series-season-content__seasons-list-item"]}
          >
            <Link
              key={seasonItem.name}
              href={`/series/${seriesDetails?.id}/season/${seasonItem.season_number}`}
            >
              <Button
                active={
                  seasonItem.season_number === seasonDetails?.season_number
                }
              >
                {seasonItem?.name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SeriesSeasonContentSeasons;
