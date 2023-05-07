import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { RankingSortOption, Series } from "@/types/types";
import { fetchTvSeriesRankingData } from "@/store/rankingSlice";
import styles from "../Rankings.module.scss";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import RankingContentOptions from "../RankingOptions/RankingOptions";
import { FilterOutlined } from "@ant-design/icons";
import Button from "@/components/Button/Button";
import RankingContentFilters from "../RankingFilters/RankingFilters";

const RankingTvSeries = () => {
  const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { tvSeriesRanking } = useAppSelector((state) => state.ranking);
  const imageHeight = 120;
  const imageWidth = imageHeight * 0.667;

  useEffect(() => {
    dispatch(fetchTvSeriesRankingData({ sortBy: "vote_average.desc" }));
  }, []);

  const options: RankingSortOption[] = [
    {
      label: "Top 100",
      value: "vote_average.desc",
    },
    {
      label: "Popular",
      value: "popularity.desc",
    },
  ];

  return (
    <>
      <div className={styles["ranking__options-wrapper"]}>
        <RankingContentOptions options={options} contentType="tv-series" />
        <Button
          ariaLabel={areFiltersOpen ? "Close filters" : "Open filters"}
          active={areFiltersOpen}
          onClick={() => setAreFiltersOpen(!areFiltersOpen)}
        >
          <FilterOutlined />
        </Button>
      </div>
      {areFiltersOpen && <RankingContentFilters contentType="tv-series" />}
      <ul className={styles["ranking-list"]}>
        {tvSeriesRanking?.results?.map((series: Series, index: number) => (
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
                  <ImagePlaceholder width={imageWidth} height={imageHeight} />
                )}
                <div className={styles["ranking-list__item-content"]}>
                  <div className={styles["ranking-list__item-text"]}>
                    <h2 className={styles["ranking-list__item-title"]}>{series.name}</h2>
                  </div>
                  {series.vote_average && series.vote_count && (
                    <div className={styles["ranking-list__item-rating"]}>
                      <div className={styles["ranking-list__item-vote-average"]}>
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
    </>
  );
};

export default RankingTvSeries;
