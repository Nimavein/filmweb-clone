import { useAppSelector } from "@/store";
import { ApiStatus, Movie } from "@/types/types";
import MoviesListItem from "./MoviesListItem/MoviesListItem";
import styles from "./MoviesList.module.scss";

interface MoviesListPropsType {
    movies: Movie[];
}

const MoviesList = ({movies} : MoviesListPropsType) => {
  const status = useAppSelector((state) => state.movies.status);

  return (
    <ul className={styles["movies-list"]}>
      {movies.map(({ title, id, overview, poster_path }: Movie) => (
        <li className={styles["movies-list__item"]} key={id}>
          <MoviesListItem title={title} posterPath={poster_path} id={id} overview={overview} />
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
