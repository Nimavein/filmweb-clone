"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import NavbarSearchItem from "./HeaderSearchItem/HeaderSearchItem";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSearchMulti } from "@/apiHelpers/searchApi";
import useSearchParam from "@/hooks/useSearchParam";
import { SearchResults } from "@/types/types";

import styles from "./HeaderSearch.module.scss";

const HeaderSearch = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [results, setResults] = useState<SearchResults>();
  const [open, setOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const { setSearchParam, removeSearchParam } = useSearchParam();
  const isSearchPage = usePathname().includes("/search");
  const router = useRouter();

  const fetchSearchResults = async (value: string) => {
    if (value || query) {
      const newResults = await getSearchMulti(value || query || "");
      setResults(newResults);
      if (value) {
        setSearchParam("query", value);
      } else {
        removeSearchParam("query");
      }
    }
  };

  useEffect(() => {
    fetchSearchResults(query || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const delayedSearch = (value: string) => {
    fetchSearchResults(value);
  };

  const handleSearch = async (value: string) => {
    if (results && results?.length > 0 && !isSearchPage) setOpen(true);
    setQuery(value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(setTimeout(() => delayedSearch(value), 500));
  };

  const handleSelect = () => {
    setOpen(false);
  };

  const handleFocus = () => {
    if (!isSearchPage) setOpen(true);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleEnterClick = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !isSearchPage) {
      const chosenOption = document.querySelector(
        ".ant-select-item-option-active a"
      ) as HTMLAnchorElement;
      event.preventDefault();

      if (chosenOption) {
        chosenOption.click();
      } else if (query && query?.length > 0) {
        router.push(`/search?${searchParams}`);
      }
      setOpen(false);
    }
  };

  const searchOptions = results?.map((result) => {
    const title =
      "title" in result ? result.title : "name" in result && result.name;
    const mediaType = result.media_type;
    const id = result.id;

    return {
      key: `${title}-${mediaType}-${id}`,
      value: title,
      label: <NavbarSearchItem {...result} />,
    };
  });

  return (
    <AutoComplete
      open={open}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={(event) => handleEnterClick(event)}
      allowClear
      className={styles["header-search"]}
      placeholder="Search for movies, tv series and people"
      options={searchOptions}
      onSelect={handleSelect}
      onSearch={handleSearch}
      value={query}
    />
  );
};

export default HeaderSearch;
