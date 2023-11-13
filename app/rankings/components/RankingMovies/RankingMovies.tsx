import React from "react";
import {
  ActiveRankingFilters,
  GenresDTO,
  Movie,
  Movies,
  RankingSortOption,
} from "@/types/types";
import styles from "../../Rankings.module.scss";
import Rating from "@/components/Rating/Rating";
import Link from "next/link";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import RankingContentOptions from "../RankingOptions/RankingOptions";
import RankingContentFilters from "../RankingFilters/RankingFilters";

interface RankingMoviesProps {
  sortBy: string;
  movies: Movies;
  activeFilters: ActiveRankingFilters;
  genres: GenresDTO;
}

const RankingMovies = ({
  sortBy,
  movies,
  activeFilters,
  genres,
}: RankingMoviesProps) => {
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
        contentType="movies"
        activeFilters={activeFilters}
        genres={genres}
      />
      <ul className={styles["ranking-list"]}>
        {movies?.results?.map((movie: Movie, index: number) => (
          <li key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              <div className={styles["ranking-list__item"]}>
                <p className={styles["ranking-list__item-rank"]}>{index + 1}</p>
                {movie.poster_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie.poster_path}`}
                    alt=""
                    height={imageHeight}
                    width={imageWidth}
                  />
                ) : (
                  <ImagePlaceholder width={imageWidth} height={imageHeight} />
                )}
                <div className={styles["ranking-list__item-content"]}>
                  <div className={styles["ranking-list__item-text"]}>
                    <h2 className={styles["ranking-list__item-title"]}>
                      {movie.title}
                    </h2>
                  </div>
                  <div className={styles["ranking-list__item-rating"]}>
                    <span className={styles["ranking-list__item-vote-average"]}>
                      <Rating
                        small
                        defaultValue={movie.vote_average}
                        voteCount={movie.vote_count}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RankingMovies;
