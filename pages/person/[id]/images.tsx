import MovieImagesList from "@/components/MovieImagesList/MovieImagesList";
import PersonImagesList from "@/components/PersonImagesList/PersonImagesList";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPersonData } from "@/store/personSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PersonImages = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const { images } = useAppSelector((state) => state.person);

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
