import { MediaType, Movie, ProfileContentType, Series } from "@/types/types";
import React, { useEffect, useState } from "react";
import ProfileTabItem from "../ProfileTabItem/ProfileTabItem";
import useSearchParam from "@/hooks/useSearchParam";
import { useAuthentication } from "@/context/Authentication.context";
import Button from "@/components/Button/Button";
import getMediasFetchFunction from "@/helpers/getMediasFetchFunction";
import getName from "@/helpers/getName";

import styles from "../../../../Profile.module.scss";
import getMediaHref from "@/helpers/getMediaHref";

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
  const contentType =
    (getSearchParam("content") as ProfileContentType) || "favorites";

  useEffect(() => {
    setMedias(initialMedias);
    setCurrentPage(1);
  }, [contentType]);

  const handleLoadMoreMovies = async () => {
    if (sessionId && accountId && contentType) {
      const getMovies = getMediasFetchFunction(mediaType, contentType);

      if (getMovies) {
        try {
          const newMedias = await getMovies(
            accountId,
            sessionId,
            currentPage + 1
          );

          if (newMedias) {
            setMedias(
              (prevMedias) =>
                [...(prevMedias || []), ...(newMedias?.results || [])] as
                  | Series[]
                  | Movie[]
            );
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
              linkUrl={getMediaHref(mediaType, media.id)}
              imagePath={media.poster_path}
              title={getName(media)}
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
