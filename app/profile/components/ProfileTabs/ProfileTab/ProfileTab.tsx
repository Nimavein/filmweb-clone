import React from "react";
import { Movies, TvSeries } from "@/types/types";
import ProfileTabMoviesSection from "./ProfleTabMoviesSection/ProfileTabMoviesSection";
import ProfileTabTvSeriesSection from "./ProfileTabTvSeriesSection/ProfileTabTvSeriesSection";

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
        <ProfileTabMoviesSection
          initialMovies={movies?.results}
          totalPages={movies?.total_pages}
        />
      )}
      {tvSeries?.results && (
        <ProfileTabTvSeriesSection
          initialTvSeries={tvSeries?.results}
          totalPages={tvSeries?.total_pages}
        />
      )}
    </div>
  );
};

export default ProfileTab;
