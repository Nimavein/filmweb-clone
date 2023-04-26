import { SearchResults } from "@/types/types";
import React, { useCallback, useEffect, useState } from "react";
import SearchListItem from "./SearchListItem/SearchListItem";
import InfiniteScroll from "react-infinite-scroll-component";

interface SearchListTabProps {
  results: SearchResults;
}

const SearchListTab = ({ results }: SearchListTabProps) => {
  const [visibleResults, setVisibleResults] = useState(results?.slice(0, 20));

  useEffect(() => {
    setVisibleResults(results?.slice(0, 20));
  }, [results]);

  const loadMoreResults = useCallback(() => {
    const newVisibleResults = results?.slice(
      visibleResults?.length ?? 0,
      (visibleResults?.length ?? 0) + 20
    );
    setVisibleResults((prevVisibleResults) => [
      ...(prevVisibleResults || []),
      ...(newVisibleResults || []),
    ]);
  }, [results, visibleResults]);

  return (
    <InfiniteScroll
      dataLength={visibleResults?.length ?? 0}
      next={loadMoreResults}
      hasMore={visibleResults && results ? visibleResults?.length < results?.length : false}
      loader={<div>Loading...</div>}
    >
      <ul>
        {visibleResults?.map((result) => (
          <li key={result.id}>
            <SearchListItem {...result} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default SearchListTab;
