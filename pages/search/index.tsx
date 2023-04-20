import { useState } from "react";
import { useAppSelector } from "@/store";
import SearchList from "@/components/SearchList/SearchList";

const SearchPage = () => {
  const { results } = useAppSelector((state) => state.search);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return <main>{results && <SearchList />}</main>;
};

export default SearchPage;
