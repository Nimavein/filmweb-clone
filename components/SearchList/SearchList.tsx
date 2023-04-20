import { useAppSelector } from "@/store";
import { Tabs, TabsProps } from "antd";
import SearchListTab from "./SearchListTab/SearchListTab";
import styles from "./SearchList.module.scss";

const SearchList = () => {
  const { results } = useAppSelector((state) => state.search);
  const movies = results?.filter((result) => result.media_type === "movie") || [];
  const tvSeries = results?.filter((result) => result.media_type === "tv") || [];
  const people = results?.filter((result) => result.media_type === "person") || [];
  const moviesAmount = movies?.length;
  const tvSeriesAmount = tvSeries?.length;
  const peopleAmount = people?.length;

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: `All (${results?.length})`,
      children: <SearchListTab results={results} />,
    },
    {
      key: "2",
      label: `Movies (${moviesAmount})`,
      children: <SearchListTab results={movies} />,
      disabled: moviesAmount === 0,
    },
    {
      key: "3",
      label: `Tv Series (${tvSeriesAmount})`,
      children: <SearchListTab results={tvSeries} />,
      disabled: tvSeriesAmount === 0,
    },
    {
      key: "4",
      label: `People (${peopleAmount})`,
      children: <SearchListTab results={people} />,
      disabled: peopleAmount === 0,
    },
  ];

  return (
    <section className={styles["search-list"]}>
      {results?.length && results?.length > 0 ? <Tabs centered items={tabs} defaultActiveKey={"1"} /> : <>No results</>}
    </section>
  );
};

export default SearchList;
