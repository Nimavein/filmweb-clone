import { useState } from "react";
import { AutoComplete } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearchQuery, searchMulti } from "@/store/searchSlice";
import { useRouter } from "next/router";
import navbarStyles from "../Navbar.module.scss";
import NavbarSearchItem from "./NavbarSearchItem/NavbarSearchItem";

const NavbarSearch = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { results } = useAppSelector((state) => state.search);
  const router = useRouter();
  const isSearchPage = router.pathname.includes("/search");

  const dropdownImageHeight = 60;
  const dropdownImageWidth = dropdownImageHeight * 0.667;

  const handleSearch = async (value: string) => {
    setQuery(value);
    dispatch(setSearchQuery(value));
    await dispatch(searchMulti(value));
  };

  const handleSelect = async (value: string) => {
    setQuery(value);
    setOpen(false);
  };

  const handleFocus = () => {
    if (!isSearchPage) setOpen(true);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleEnterClick = (event: any) => {
    if (event.key === "Enter" && query.length > 0 && router.asPath !== "/search") {
      router.push("/search");
      setOpen(false);
    }
  };

  const searchOptions = results?.map((result) => {
    const title = "title" in result ? result.title : "name" in result && result.name;
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
