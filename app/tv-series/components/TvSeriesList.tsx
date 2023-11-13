import styles from "./TvSeriesList.module.scss";
import Pagination from "../../../components/Pagination/Pagination";
import { TvSeries } from "@/types/types";
import TvSeriesListItem from "./TvSeriesListItem/TvSeriesListItem";

interface TvSeriesListPropsType {
  tvSeries: TvSeries;
  currentPage: number;
}

const TvSeriesList = ({ tvSeries, currentPage }: TvSeriesListPropsType) => {
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
        totalItemsAmount={tvSeries?.total_results}
        pageSize={20}
      />
    </section>
  );
};

export default TvSeriesList;
