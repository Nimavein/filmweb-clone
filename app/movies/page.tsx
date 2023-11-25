import { ActiveMediaFiltersType, PagePaginationParams } from "@/types/types";
import MoviesList from "./components/MoviesList";
import { getMoviesRankingData } from "@/apiHelpers";
import MediaFilters from "@/components/MediaFilters/MediaFilters";

import styles from "./Movies.module.scss";

const Movies = async ({
  searchParams: { page, productionYear, genre, originalLanguage, sortBy },
}: PagePaginationParams) => {
  const activeFilters: ActiveMediaFiltersType = {
    productionYear: productionYear?.split(","),
    genre: genre?.split(","),
    originalLanguage: originalLanguage?.split(","),
  };
  const currentPage = parseInt(page) || 1;
  const movies = await getMoviesRankingData(sortBy, activeFilters, currentPage);

  return (
    <main className={styles["movies"]}>
      <h1 className={styles["movies__header"]}>
        MOVIES FOUND: {movies?.total_results}
      </h1>
      <MediaFilters
        contentType="movies"
        activeFilters={activeFilters}
        sortBy={sortBy}
      />
      {movies && <MoviesList movies={movies} currentPage={currentPage} />}
    </main>
  );
};

export default Movies;
