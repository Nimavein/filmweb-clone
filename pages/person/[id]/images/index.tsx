import MovieImagesList from "@/pages/movie/[id]/images/components/MovieImagesList";
import PersonImagesList from "@/pages/person/[id]/images/components/PersonImagesList";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPersonData } from "@/store/personSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PersonImages = () => {
  const router = useRouter();
  const { id } = router.query;

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
