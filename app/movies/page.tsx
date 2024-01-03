import { ActiveMediaFiltersType, PagePaginationParams } from "@/types/types";
import MoviesList from "./components/MoviesList";
import { getMoviesData } from "@/apiHelpers";
import MediaFilters from "@/components/MediaFilters/MediaFilters";
import type { Metadata } from "next";

import styles from "./Movies.module.scss";

export const metadata: Metadata = {
  title: "Browse Movies: Explore a Variety of Films",
  description:
    "Discover a diverse collection of movies. Use filters to find the perfect film and enjoy seamless pagination for an enhanced browsing experience. Find the latest releases, timeless classics, and hidden gems.",
};

const Movies = async ({
  searchParams: {
    page,
    productionYear,
    genre,
    originalLanguage,
    sortBy,
    watchProviders,
    minVoteCount,
  },
}: PagePaginationParams) => {
  const activeFilters: ActiveMediaFiltersType = {
    productionYear: productionYear?.split(","),
    genre: genre?.split(","),
    originalLanguage: originalLanguage?.split(","),
    providers: watchProviders?.split(","),
  };
  const currentPage = parseInt(page) || 1;
  const movies = await getMoviesData(
    sortBy,
    activeFilters,
    minVoteCount,
    currentPage
  );

  return (
    <main className={styles["movies"]}>
      <h1 className={styles["movies__header"]}>
        MOVIES FOUND: {movies?.total_results}
      </h1>
      <MediaFilters
        contentType="movies"
        activeFilters={activeFilters}
        sortBy={sortBy}
        minVoteCount={minVoteCount || "500"}
      />
      {movies && <MoviesList movies={movies} currentPage={currentPage} />}
    </main>
  );
};

export default Movies;
