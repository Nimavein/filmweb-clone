import { MediaType, Movie, ProfileContentType, Series } from "@/types/types";
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
  getFavoriteTvSeries,
  getRatedTvSeries,
  getWatchListTvSeries,
} from "@/apiHelpers";
import Button from "@/components/Button/Button";

interface ProfileTabSectionProps {
  initialMedias: Series[] | Movie[];
  totalPages: number;
  mediaType: MediaType;
}

const baseCSSClassName = "profile-tab";

const ProfileTabSection = ({
  initialMedias,
  totalPages,
  mediaType,
}: ProfileTabSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [medias, setMedias] = useState(initialMedias);
  const { getSearchParam } = useSearchParam();
  const { sessionId, accountId } = useAuthentication();
  const contentType = getSearchParam("content") as ProfileContentType;

  useEffect(() => {
    setMedias(initialMedias);
    setCurrentPage(1)
  }, [contentType]);

  const getMediasFunction = () => {
    if (mediaType === "movie") {
      if (contentType === "favorites") {
        return getFavoriteMovies;
      } else if (contentType === "ratings") {
        return getRatedMovies;
      } else if (contentType === "watchList") {
        return getWatchListMovies;
      }
    } else if (mediaType === "tv") {
      if (contentType === "favorites") {
        return getFavoriteTvSeries;
      } else if (contentType === "ratings") {
        return getRatedTvSeries;
      } else if (contentType === "watchList") {
        return getWatchListTvSeries;
      }
    }
  };

  const handleLoadMoreMovies = async () => {
    if (sessionId && accountId && contentType) {
      const getMovies = getMediasFunction();

      if (getMovies) {
        try {
          const newMedias = await getMovies(
            accountId,
            sessionId,
            currentPage + 1
          );

          if (newMedias) {
            setMedias((prevMedias) => [
              ...(prevMedias || []),
              ...(newMedias?.results || []),
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
      <h2 className={styles[`${baseCSSClassName}__subheader`]}>
        {mediaType === "movie" ? "MOVIES" : "TV SERIES"}
      </h2>
      <ul className={styles[`${baseCSSClassName}__items`]}>
        {medias?.map((media) => (
          <li
            className={styles[styles[`${baseCSSClassName}__list-item`]]}
            key={media.id}
          >
            <ProfileTabItem
              linkUrl={`${getSearchResultType("movie")}${media?.id}`}
              imagePath={media.poster_path}
              title={
                ("title" in media
                  ? media.title
                  : "name" in media && media.name) || ""
              }
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

export default ProfileTabSection;
