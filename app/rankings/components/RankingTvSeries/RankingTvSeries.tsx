import {
  ActiveRankingFilters,
  GenresDTO,
  RankingSortOption,
  Series,
  TvSeries,
} from "@/types/types";
import styles from "../../Rankings.module.scss";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import RankingContentOptions from "../RankingOptions/RankingOptions";
import RankingContentFilters from "../RankingFilters/RankingFilters";

interface RankingTvSeriesProps {
  sortBy: string;
  tvSeries: TvSeries;
  activeFilters: ActiveRankingFilters;
  genres: GenresDTO;
}

const RankingTvSeries = ({
  tvSeries,
  sortBy,
  activeFilters,
  genres,
}: RankingTvSeriesProps) => {
  const imageHeight = 120;
  const imageWidth = imageHeight * 0.667;

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
        <RankingContentOptions options={options} sortBy={sortBy} />
      </div>
      <RankingContentFilters
        activeFilters={activeFilters}
        contentType="tv-series"
        genres={genres}
      />
      <ul className={styles["ranking-list"]}>
        {tvSeries?.results?.map((series: Series, index: number) => (
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
    </>
  );
};

export default RankingTvSeries;
