"use client";

import React from "react";
import { MediaType, Movie, Series } from "@/types/types";
import Rating from "@/components/Rating/Rating";
import Link from "next/link";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import InfiniteScroll from "react-infinite-scroll-component";
import getName from "@/helpers/getName";
import getMediaHref from "@/helpers/getMediaHref";

import styles from "../../Rankings.module.scss";

interface RankingMediasProps {
  medias: Movie[] | Series[];
  fetchMediaData: () => Promise<void>;
  mediaType: MediaType;
}

const RankingMedias = ({
  medias,
  fetchMediaData,
  mediaType,
}: RankingMediasProps) => {
  const imageHeight = 120;
  const imageWidth = imageHeight * 0.667;

  return (
    <InfiniteScroll
      dataLength={medias.length}
      next={fetchMediaData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more data</p>}
    >
      <ul className={styles["ranking-list"]}>
        {medias.map((media, index: number) => (
          <li key={media.id}>
            <Link href={getMediaHref(mediaType, media.id)}>
              <div className={styles["ranking-list__item"]}>
                <p className={styles["ranking-list__item-rank"]}>{index + 1}</p>
                {media.poster_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${media.poster_path}`}
                    alt=""
                    height={imageHeight}
                    width={imageWidth}
                  />
                ) : (
                  <ImagePlaceholder
                    width={imageWidth}
                    height={imageHeight}
                    type="image"
                  />
                )}
                <div className={styles["ranking-list__item-content"]}>
                  <div className={styles["ranking-list__item-text"]}>
                    <h2 className={styles["ranking-list__item-title"]}>
                      {getName(media)}
                    </h2>
                  </div>
                  <div className={styles["ranking-list__item-rating"]}>
                    <span className={styles["ranking-list__item-vote-average"]}>
                      {media?.vote_average && media?.vote_count && (
                        <Rating
                          small
                          defaultValue={media.vote_average}
                          voteCount={media.vote_count}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default RankingMedias;
