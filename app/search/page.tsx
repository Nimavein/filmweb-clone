import { getSearchMulti } from "@/api/searchApi";
import SearchListTab from "./components/SearchListTab/SearchListTab";
import { PageSearchParams } from "@/types/types";
import Tabs from "@/components/Tabs/Tabs";

import styles from "./Search.module.scss";

const SearchPage = async ({ searchParams: { query } }: PageSearchParams) => {
  const results = await getSearchMulti(query);
  const movies =
    results?.filter((result) => result.media_type === "movie") || [];
  const tvSeries =
    results?.filter((result) => result.media_type === "tv") || [];
  const people =
    results?.filter((result) => result.media_type === "person") || [];
  const moviesAmount = movies?.length;
  const tvSeriesAmount = tvSeries?.length;
  const peopleAmount = people?.length;

  const tabs = [
    {
      key: "all",
      label: `All (${results?.length})`,
      children: <SearchListTab results={results || []} />,
    },
    {
      key: "movies",
      label: `Movies (${moviesAmount})`,
      children: <SearchListTab results={movies} />,
      disabled: moviesAmount === 0,
    },
    {
      key: "tv-series",
      label: `Tv Series (${tvSeriesAmount})`,
      children: <SearchListTab results={tvSeries} />,
      disabled: tvSeriesAmount === 0,
    },
    {
      key: "people",
      label: `People (${peopleAmount})`,
      children: <SearchListTab results={people} />,
      disabled: peopleAmount === 0,
    },
  ];

  return (
    <main className={styles["search-list"]}>
      {results?.length && results?.length > 0 ? (
        <Tabs items={tabs} defaultActiveKey={"all"} paramKey="searchContent" />
      ) : (
        <>No results</>
      )}
    </main>
  );
};

export default SearchPage;
