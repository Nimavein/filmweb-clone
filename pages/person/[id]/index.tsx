import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPersonData } from "@/store/personSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PersonContent from "./components/Person";

const Person = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = router.query;
  const { details, status } = useAppSelector((state) => state.person);

  useEffect(() => {
    if (id && details?.id !== Number(id)) dispatch(fetchPersonData(Number(id)));
  }, [id]);

  return status === "loading" ? (
    <Loader />
  ) : (
    <>{details && <PersonContent />}</>
  );
};

export default Person;
