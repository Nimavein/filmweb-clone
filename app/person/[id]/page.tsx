"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPersonData } from "@/store/personSlice";
import { useEffect } from "react";
import PersonContent from "./components/Person";
import { PageIdParams } from "@/types/types";

const Person = ({ params: { id } }: PageIdParams) => {
  const dispatch = useAppDispatch();

  const { details } = useAppSelector((state) => state.person);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchPersonData(Number(id)));
  }, [id]);

  return details && <PersonContent />;
};

export default Person;
