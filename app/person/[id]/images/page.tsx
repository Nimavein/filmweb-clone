"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPersonData } from "@/store/personSlice";
import React, { useEffect } from "react";
import PersonImagesList from "./components/PersonImagesList";
import { PageIdParams } from "@/types/types";

const PersonImages = ({ params: { id } }: PageIdParams) => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.person.details?.images);

  useEffect(() => {
    if (id && !images) dispatch(fetchPersonData(Number(id)));
  }, [images, id, dispatch]);

  return (
    <main>
      <PersonImagesList />
    </main>
  );
};

export default PersonImages;
