import { PageIdParams } from "@/types/types";
import { getMovieCollection, getMovieData, getMovieReviews } from "@/api";
import MovieCollection from "./components/MovieCollection/MovieCollection";
import MovieDescription from "./components/MovieDescription/MovieDescription";
import MovieInformation from "./components/MovieInformation/MovieInformation";
import MovieTopPanel from "./components/MovieTopPanel/MovieTopPanel";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieCredits from "./components/MovieCredits/MovieCredits";
import MovieImages from "./components/MovieImages/MovieImages";

import styles from "./Movie.module.scss";

const Movie = async ({ params: { id } }: PageIdParams) => {
  const numberId = Number(id);
  let movieCollection;
  const movieData = await getMovieData(numberId);
  const movieDetails = movieData?.movieDetails;
  const movieCredits = movieDetails?.credits;
  const movieImages = movieDetails?.images;
  const movieReviews = await getMovieReviews(numberId, 1);
  if (movieDetails?.belongs_to_collection) {
    movieCollection = await getMovieCollection(
      movieDetails?.belongs_to_collection?.id
    );
  }

  return (
    movieDetails && (
      <main className={styles["movie"]}>
        <MovieTopPanel movieDetails={movieDetails} />
        <MovieDescription movieDetails={movieDetails} />
        {movieCollection && (
          <MovieCollection movieCollection={movieCollection} />
        )}
        {movieReviews?.results && movieReviews?.results?.length > 0 && (
          <MovieReviews
            movieReviews={movieReviews}
            movieDetails={movieDetails}
          />
        )}
        {movieCredits?.cast && movieCredits?.cast?.length > 0 && (
          <MovieCredits movieDetails={movieDetails} />
        )}
        <MovieInformation movieDetails={movieDetails} />
        {movieImages?.backdrops && movieImages?.backdrops?.length > 0 && (
          <MovieImages movieDetails={movieDetails} />
        )}
      </main>
    )
  );
};

export default Movie;
