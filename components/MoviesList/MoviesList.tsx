import { Movie } from "@/types/types";


interface MoviesListPropsType {
    movies: Movie[],
}

const MoviesList = ({movies} : MoviesListPropsType) => {
  return (
    <div>
      {movies.map((movie: Movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
