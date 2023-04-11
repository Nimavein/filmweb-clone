import { People } from "@/types/types";
import styles from "./PeopleList.module.scss";
import PeopleListItem from "./PeopleListItem/PeopleListItem";
import { Dispatch, SetStateAction } from "react";
import Pagination from "../Pagination/Pagination";

interface MoviesListPropsType {
  people: People;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const PeopleList = ({ people, currentPage, setCurrentPage }: MoviesListPropsType) => {
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
        setCurrentPage={setCurrentPage}
        totalItemsAmount={people?.total_results}
        pageSize={20}
      />
    </section>
  );
};

export default PeopleList;
