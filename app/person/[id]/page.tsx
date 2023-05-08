"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPersonData } from "@/store/personSlice";
import { useEffect } from "react";
import PersonContent from "./components/Person";
import { useSearchParams } from "next/navigation";

const Person = () => {
  const dispatch = useAppDispatch();
  const id = useSearchParams().get("id");

  const { details } = useAppSelector((state) => state.person);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchPersonData(Number(id)));
  }, [id]);

  return details && <PersonContent />;
};

export default Person;
