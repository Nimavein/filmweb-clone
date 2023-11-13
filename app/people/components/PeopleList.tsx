import { People } from "@/types/types";
import styles from "./PeopleList.module.scss";
import PeopleListItem from "./PeopleListItem/PeopleListItem";
import Pagination from "../../../components/Pagination/Pagination";

interface MoviesListPropsType {
  people: People;
  currentPage: number;
}

const PeopleList = ({ people, currentPage }: MoviesListPropsType) => {
  return (
    <section className={styles["people"]}>
      <ul className={styles["people-list"]}>
        {people?.results?.map((person) => (
          <li className={styles["people-list__item"]} key={person.id}>
            <PeopleListItem {...person} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalItemsAmount={people?.total_results}
        pageSize={20}
      />
    </section>
  );
};

export default PeopleList;
