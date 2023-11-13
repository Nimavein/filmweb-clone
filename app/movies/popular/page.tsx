import { PagePaginationParams } from "@/types/types";
import MoviesList from "../components/MoviesList";
import { getPopularMovies } from "@/api";

const PopularMoviesPage = async ({
  searchParams: { page },
}: PagePaginationParams) => {
  const currentPage = parseInt(page) || 1;
  const popularMovies = await getPopularMovies(currentPage);

  return (
    <main>
      {popularMovies && (
        <MoviesList movies={popularMovies} currentPage={currentPage} />
      )}
    </main>
  );
};

export default PopularMoviesPage;
