import { SearchResults } from "@/types/types";
import React from "react";
import SearchListItem from "./SearchListItem/SearchListItem";

interface SearchListTabProps {
  results: SearchResults;
}

const SearchListTab = ({ results }: SearchListTabProps) => {
  return (
    <ul>
      {results?.map((result) => (
        <SearchListItem key={result.id} {...result} />
      ))}
    </ul>
  );
};

export default SearchListTab;
