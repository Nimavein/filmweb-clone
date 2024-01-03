import {
  getMovieCollection,
  getMovieData,
  getMovieReviews,
} from "@/apiHelpers";
import MovieCollection from "./components/MovieCollection/MovieCollection";
import MovieDescription from "./components/MovieDescription/MovieDescription";
import MovieInformation from "./components/MovieInformation/MovieInformation";
import MovieRelated from "./components/MovieRelated/MovieRelated";
import MovieTopPanel from "./components/MovieTopPanel/MovieTopPanel";
import MovieCredits from "./components/MovieCredits/MovieCredits";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieImages from "./components/MovieImages/MovieImages";
import { PageIdParams } from "@/types/types";

import styles from "./Movie.module.scss";

export async function generateMetadata({ params: { id } }: PageIdParams) {
  const numberId = parseInt(id);
  try {
    const movieData = await getMovieData(numberId);
    const movieDetails = movieData?.movieDetails;
    return {
      title: `${movieDetails?.title} (${movieDetails?.release_date?.substring(
        0,
        4
      )})`,
      description: movieDetails?.overview,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

const Movie = async ({ params: { id } }: PageIdParams) => {
  const numberId = Number(id);
  let movieCollection;
  const movieData = await getMovieData(numberId);
  const movieDetails = movieData?.movieDetails;
  const movieCredits = movieDetails?.credits;
  const movieImages = movieDetails?.images;
  const similarMovies = movieDetails?.similar;
  const recommendedMovies = movieDetails?.recommendations;
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
        <MovieRelated
          similarMovies={similarMovies}
          recommendedMovies={recommendedMovies}
        />
      </main>
    )
  );
};

export default Movie;
