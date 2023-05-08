import { useAppSelector } from "@/store";
import SearchList from "./components/SearchList";

const SearchPage = () => {
  const { results } = useAppSelector((state) => state.search);

  return <main>{results && <SearchList />}</main>;
};

export default SearchPage;
