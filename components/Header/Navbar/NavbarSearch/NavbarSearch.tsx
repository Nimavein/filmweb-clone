import { KeyboardEvent, useState } from "react";
import { AutoComplete } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearchQuery, searchMulti } from "@/store/searchSlice";
import navbarStyles from "../Navbar.module.scss";
import NavbarSearchItem from "./NavbarSearchItem/NavbarSearchItem";
import { usePathname, useRouter } from "next/navigation";

const NavbarSearch = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const dispatch = useAppDispatch();
  const { results } = useAppSelector((state) => state.search);
  const isSearchPage = usePathname().includes("/search");
  const router = useRouter();

  const delayedSearch = async (value: string) => {
    await dispatch(searchMulti(value));
  };

  const handleSearch = async (value: string) => {
    if (results && results?.length > 0 && !isSearchPage) setOpen(true);
    setQuery(value);
    dispatch(setSearchQuery(value));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(setTimeout(() => delayedSearch(value), 500));
  };

  const handleSelect = (value: string) => {
    setQuery(value);
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

      if (chosenOption) {
        event.preventDefault();
        chosenOption.click();
      } else if (query.length > 0) {
        router.push("/search");
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
      className={navbarStyles["main-navbar__search"]}
      placeholder="Search for movies, tv series and people"
      options={searchOptions}
      onSelect={handleSelect}
      onSearch={handleSearch}
      value={query}
    />
  );
};

export default NavbarSearch;
