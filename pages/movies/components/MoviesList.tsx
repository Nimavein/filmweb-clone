import { Movies } from "@/types/types";
import MoviesListItem from "./MoviesListItem/MoviesListItem";
import styles from "./MoviesList.module.scss";
import Pagination from "../../../components/Pagination/Pagination";
import { Dispatch, SetStateAction } from "react";

interface MoviesListPropsType {
  movies: Movies;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const MoviesList = ({ movies, currentPage, setCurrentPage }: MoviesListPropsType) => {
  return (
    <section className={styles["movies"]}>
      <ul className={styles["movies-list"]}>
        {movies?.results?.map(({ id, ...movie }) => (
          <li className={styles["movies-list__item"]} key={id}>
            <MoviesListItem {...movie} id={id} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItemsAmount={movies?.total_results}
        pageSize={20}
      />
    </section>
  );
};

export default MoviesList;
