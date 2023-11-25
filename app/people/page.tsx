import { PagePaginationParams } from "@/types/types";
import { getPopularPeople } from "@/apiHelpers";
import PeopleList from "./components/PeopleList";

import styles from "./People.module.scss";

const PopularPeoplePage = async ({
  searchParams: { page },
}: PagePaginationParams) => {
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

export default PopularPeoplePage;
