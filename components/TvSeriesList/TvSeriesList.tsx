import styles from "./TvSeriesList.module.scss";
import Pagination from "../Pagination/Pagination";
import { Dispatch, SetStateAction } from "react";
import { TvSeries } from "@/types/types";
import TvSeriesListItem from "./TvSeriesListItem/TvSeriesListItem";

interface TvSeriesListPropsType {
  tvSeries: TvSeries;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const TvSeriesList = ({ tvSeries, currentPage, setCurrentPage }: TvSeriesListPropsType) => {
  return (
    <section className={styles["tv-series"]}>
      <ul className={styles["tv-series-list"]}>
        {tvSeries?.results?.map(({ id, ...series }) => (
          <li className={styles["tv-series-list__item"]} key={id}>
            <TvSeriesListItem {...series} id={id} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItemsAmount={tvSeries?.total_results}
        pageSize={20}
      />
    </section>
  );
};

export default TvSeriesList;
