"use client";

import { Series } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "../../Rankings.module.scss";

interface RankingTvSeriesProps {
  tvSeries: Series[];
  fetchTvSeriesData: () => Promise<void>;
}

const RankingTvSeries = ({
  tvSeries,
  fetchTvSeriesData,
}: RankingTvSeriesProps) => {
  const imageHeight = 120;
  const imageWidth = imageHeight * 0.667;

  return (
    <InfiniteScroll
      dataLength={tvSeries.length}
      next={fetchTvSeriesData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more movies</p>}
    >
      <ul className={styles["ranking-list"]}>
        {tvSeries?.map((series: Series, index: number) => (
          <li key={series.id}>
            <Link href={`/series/${series.id}`}>
              <div className={styles["ranking-list__item"]}>
                <p className={styles["ranking-list__item-rank"]}>{index + 1}</p>
                {series.poster_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${series.poster_path}`}
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
                      {series.name}
                    </h2>
                  </div>
                  {series.vote_average && series.vote_count && (
                    <div className={styles["ranking-list__item-rating"]}>
                      <div
                        className={styles["ranking-list__item-vote-average"]}
                      >
                        <Rating
                          small
                          defaultValue={series.vote_average}
                          voteCount={series.vote_count}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default RankingTvSeries;
