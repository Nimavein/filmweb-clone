import { PagePaginationParams } from "@/types/types";
import { getPopularPeople } from "@/apiHelpers";
import PeopleList from "./components/PeopleList";

import styles from "./People.module.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Discover Talented Individuals: Explore a List of People in the Entertainment Industry",
  description:
    "Explore a diverse array of individuals in the entertainment world. From actors and directors to producers and more, discover the talented people who bring your favorite movies and TV series to life.",
};

const People = async ({ searchParams: { page } }: PagePaginationParams) => {
  const currentPage = parseInt(page) || 1;
  const people = await getPopularPeople(currentPage);

  return (
    <main className={styles["people"]}>
      <h1 className={styles["people__header"]}>
        PEOPLE FOUND: {people.total_results}
      </h1>
      {people && <PeopleList people={people} currentPage={currentPage} />}
    </main>
  );
};

export default People;
