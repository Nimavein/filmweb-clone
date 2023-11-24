import { PagePaginationParams } from "@/types/types";
import { getPopularPeople } from "@/apiHelpers";
import PeopleList from "./components/PeopleList";

const PopularPeoplePage = async ({
  searchParams: { page },
}: PagePaginationParams) => {
  const currentPage = parseInt(page) || 1;
  const popularPeople = await getPopularPeople(currentPage);

  return (
    <main>
      {popularPeople && (
        <PeopleList people={popularPeople} currentPage={currentPage} />
      )}
    </main>
  );
};

export default PopularPeoplePage;
