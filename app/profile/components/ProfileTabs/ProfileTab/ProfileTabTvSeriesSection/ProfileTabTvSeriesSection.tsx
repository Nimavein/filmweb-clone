import { ProfileContentType, Series } from "@/types/types";
import React, { useEffect, useState } from "react";
import ProfileTabItem from "../ProfileTabItem/ProfileTabItem";
import { getSearchResultType } from "@/helpers/getSearchResultType";
import useSearchParam from "@/hooks/useSearchParam";
import { useAuthentication } from "@/context/Authentication.context";
import {
  getFavoriteTvSeries,
  getWatchListTvSeries,
  getRatedTvSeries,
} from "@/apiHelpers";

import styles from "../../../../Profile.module.scss";
import Button from "@/components/Button/Button";

interface ProfileTabTvSeriesSectionProps {
  initialTvSeries: Series[];
  totalPages: number;
}

const baseCSSClassName = "profile-tab";

const ProfileTabTvSeriesSection = ({
  initialTvSeries,
  totalPages,
}: ProfileTabTvSeriesSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tvSeries, setTvSeries] = useState(initialTvSeries);
  const { getSearchParam } = useSearchParam();
  const { sessionId, accountId } = useAuthentication();
  const contentType = getSearchParam("content") as ProfileContentType;

  useEffect(() => {
    setTvSeries(initialTvSeries);
  }, [initialTvSeries]);

  const getTvSeriesFunction = () => {
    if (contentType === "favorites") {
      return getFavoriteTvSeries;
    } else if (contentType === "ratings") {
      return getRatedTvSeries;
    } else if (contentType === "watchList") {
      return getWatchListTvSeries;
    }
  };

  const handleLoadMoreTvSeries = async () => {
    if (sessionId && accountId && contentType) {
      const getTvSeries = getTvSeriesFunction();

      if (getTvSeries) {
        try {
          const newTvSeries = await getTvSeries(
            accountId,
            sessionId,
            currentPage + 1
          );

          if (newTvSeries) {
            setTvSeries((prevTvSeries) => [
              ...(prevTvSeries || []),
              ...(newTvSeries?.results || []),
            ]);
            setCurrentPage(currentPage + 1);
          }
        } catch (error) {
          console.error("Error loading more tv series:", error);
        }
      }
    }
  };

  return (
    <div className={styles[`${baseCSSClassName}__section`]}>
      <h2 className={styles[`${baseCSSClassName}__subheader`]}>TV SERIES</h2>
      <ul className={styles[`${baseCSSClassName}__items`]}>
        {tvSeries?.map((series) => (
          <li
            className={styles[styles[`${baseCSSClassName}__list-item`]]}
            key={series.id}
          >
            <ProfileTabItem
              linkUrl={`${getSearchResultType("tv")}${series?.id}`}
              imagePath={series.poster_path}
              title={series?.name}
            />
          </li>
        ))}
      </ul>
      {currentPage < totalPages && (
        <Button onClick={handleLoadMoreTvSeries}>Load More</Button>
      )}
    </div>
  );
};

export default ProfileTabTvSeriesSection;
