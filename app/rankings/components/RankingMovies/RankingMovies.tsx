"use client";

import React from "react";
import { Movie } from "@/types/types";
import Rating from "@/components/Rating/Rating";
import Link from "next/link";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "../../Rankings.module.scss";

interface RankingMoviesProps {
  movies: Movie[];
  fetchMoviesData: () => Promise<void>;
}

const RankingMovies = ({ movies, fetchMoviesData }: RankingMoviesProps) => {
  const imageHeight = 120;
  const imageWidth = imageHeight * 0.667;

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchMoviesData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more movies</p>}
    >
      <ul className={styles["ranking-list"]}>
        {movies.map((movie: Movie, index: number) => (
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
                  <ImagePlaceholder
                    width={imageWidth}
                    height={imageHeight}
                    type="image"
                  />
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
    </InfiniteScroll>
  );
};

export default RankingMovies;
