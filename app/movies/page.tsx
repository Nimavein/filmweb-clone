import { ActiveMediaFiltersType, PagePaginationParams } from "@/types/types";
import MoviesList from "./components/MoviesList";
import { getMoviesGenres, getMoviesRankingData } from "@/apiHelpers";
import MediaFilters from "@/components/MediaFilters/MediaFilters";

import styles from "./Movies.module.scss";

const Movies = async ({
  searchParams: { page, productionYear, genre, originalLanguage },
}: PagePaginationParams) => {
  const activeFilters: ActiveMediaFiltersType = {
    productionYear,
    genre,
    originalLanguage,
  };
  const currentPage = parseInt(page) || 1;
  const movies = await getMoviesRankingData(
    undefined,
    activeFilters,
    currentPage
  );
  const genres = await getMoviesGenres();

  return (
    <main className={styles["movies"]}>
      <MediaFilters
        contentType="movies"
        activeFilters={activeFilters}
        genres={genres || []}
      />
      {movies && <MoviesList movies={movies} currentPage={currentPage} />}
    </main>
  );
};

export default Movies;
