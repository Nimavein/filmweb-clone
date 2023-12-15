import { Movie, Movies, ProfileContentType } from "@/types/types";
import React, { useEffect, useState } from "react";
import ProfileTabItem from "../ProfileTabItem/ProfileTabItem";
import { getSearchResultType } from "@/helpers/getSearchResultType";

import styles from "../../../../Profile.module.scss";
import useSearchParam from "@/hooks/useSearchParam";
import { useAuthentication } from "@/context/Authentication.context";
import {
  getFavoriteMovies,
  getWatchListMovies,
  getRatedMovies,
} from "@/apiHelpers";
import Button from "@/components/Button/Button";

interface ProfileTabMoviesSectionProps {
  initialMovies: Movie[];
  totalPages: number;
}

const baseCSSClassName = "profile-tab";

const ProfileTabMoviesSection = ({
  initialMovies,
  totalPages,
}: ProfileTabMoviesSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState(initialMovies);
  const { getSearchParam } = useSearchParam();
  const { sessionId, accountId } = useAuthentication();
  const contentType = getSearchParam("content") as ProfileContentType;

  useEffect(() => {
    setMovies(initialMovies);
  }, [initialMovies]);

  const getMoviesFunction = () => {
    if (contentType === "favorites") {
      return getFavoriteMovies;
    } else if (contentType === "ratings") {
      return getRatedMovies;
    } else if (contentType === "watchList") {
      return getWatchListMovies;
    }
  };

  const handleLoadMoreMovies = async () => {
    if (sessionId && accountId && contentType) {
      const getMovies = getMoviesFunction();

      if (getMovies) {
        try {
          const newMovies = await getMovies(
            accountId,
            sessionId,
            currentPage + 1
          );

          if (newMovies) {
            setMovies((prevMovies) => [
              ...(prevMovies || []),
              ...(newMovies?.results || []),
            ]);
            setCurrentPage(currentPage + 1);
          }
        } catch (error) {
          console.error("Error loading more movies:", error);
        }
      }
    }
  };

  return (
    <div className={styles[`${baseCSSClassName}__section`]}>
      <h2 className={styles[`${baseCSSClassName}__subheader`]}>MOVIES</h2>
      <ul className={styles[`${baseCSSClassName}__items`]}>
        {movies?.map((movie) => (
          <li
            className={styles[styles[`${baseCSSClassName}__list-item`]]}
            key={movie.id}
          >
            <ProfileTabItem
              linkUrl={`${getSearchResultType("movie")}${movie?.id}`}
              imagePath={movie.poster_path}
              title={movie.title}
            />
          </li>
        ))}
      </ul>
      {currentPage < totalPages && (
        <Button onClick={handleLoadMoreMovies}>Load More</Button>
      )}
    </div>
  );
};

export default ProfileTabMoviesSection;
