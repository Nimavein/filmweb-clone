"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPopularPeople } from "@/store/peopleSlice";
import PeopleList from "../components/PeopleList";

const PopularMoviesPage = () => {
  const dispatch = useAppDispatch();
  const popularPeople = useAppSelector((state) => state.people.popular);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchPopularPeople({ page: currentPage }));
  }, [currentPage, dispatch]);

  return (
    <main>
      {popularPeople && (
        <PeopleList
          people={popularPeople}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </main>
  );
};

export default PopularMoviesPage;
