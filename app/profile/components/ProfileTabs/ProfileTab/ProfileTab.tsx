import React from "react";
import { Movies, TvSeries } from "@/types/types";
import ProfileTabSection from "./ProfleTabSection/ProfileTabSection";

import styles from "../../../Profile.module.scss";

interface ProfileTabProps {
  tvSeries: TvSeries | undefined;
  movies: Movies | undefined;
}

const baseCSSClassName = "profile-tab";

const ProfileTab = ({ tvSeries, movies }: ProfileTabProps) => {
  return (
    <div className={styles[baseCSSClassName]}>
      {movies?.results && (
        <ProfileTabSection
          initialMedias={movies?.results}
          totalPages={movies?.total_pages}
          mediaType="movie"
        />
      )}
      {tvSeries?.results && (
        <ProfileTabSection
          initialMedias={tvSeries?.results}
          totalPages={tvSeries?.total_pages}
          mediaType="tv"
        />
      )}
    </div>
  );
};

export default ProfileTab;
