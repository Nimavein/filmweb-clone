import { Movie } from "@/types/types";
import MoviesListItem from "./MoviesListItem/MoviesListItem";
import styles from "./MoviesList.module.scss";

interface MoviesListPropsType {
  movies: Movie[];
}

const MoviesList = ({ movies }: MoviesListPropsType) => {
  return (
    <ul className={styles["movies-list"]}>
      {movies.map(({ id, ...movie }) => (
        <li className={styles["movies-list__item"]} key={id}>
          <MoviesListItem {...movie} id={id} />
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
