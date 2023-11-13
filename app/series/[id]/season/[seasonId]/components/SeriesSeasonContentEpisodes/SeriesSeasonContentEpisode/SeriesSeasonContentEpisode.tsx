import React from "react";
import styles from "../SeriesSeasonContentEpisodes.module.scss";
import { SeriesEpisode } from "@/types/types";
import Image from "next/image";
import Rating from "@/components/Rating/Rating";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";

const SeriesSeasonContentEpisode = ({
  name,
  still_path,
  vote_average,
  vote_count,
  episode_number,
  season_number,
  overview,
  air_date,
}: SeriesEpisode) => {
  const imageWidth = 280;
  const imageHeight = imageWidth * 0.667;
  const overviewLengthDisplay = 300;

  return (
    <li className={styles["series-season-content__episodes-list-item"]}>
      {still_path ? (
        <Image
          alt=""
          width={imageWidth}
          height={imageHeight}
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${still_path}`}
        />
      ) : (
        <ImagePlaceholder height={imageHeight} width={imageWidth} />
      )}
      <div
        className={styles["series-season-content__episodes-list-item-content"]}
      >
        {name && (
          <h2
            className={
              styles["series-season-content__episodes-list-item-title"]
            }
          >{`${
            season_number ? `s${season_number < 10 ? "0" : ""}` : ""
          }${season_number}${
            episode_number ? `e${episode_number < 10 ? "0" : ""}` : ""
          }${episode_number} ${name}`}</h2>
        )}
        {air_date && (
          <p
            className={
              styles["series-season-content__episodes-list-item-release"]
            }
          >
            {air_date}
          </p>
        )}
        {overview && (
          <p
            className={
              styles["series-season-content__episodes-list-item-overview"]
            }
          >
            {overview?.length > overviewLengthDisplay
              ? `${overview?.substring(0, overviewLengthDisplay)}...`
              : overview}
          </p>
        )}
        <Rating
          defaultValue={vote_average || 0}
          small
          showNumber
          voteCount={vote_count}
        />
      </div>
    </li>
  );
};

export default SeriesSeasonContentEpisode;
