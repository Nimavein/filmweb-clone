import Loader from "@/components/Loader/Loader";
import PersonContent from "@/components/PersonContent/PersonContent";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPersonData } from "@/store/personSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Person = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = router.query;
  const { details, status } = useAppSelector((state) => state.person);

  useEffect(() => {
    if (id) dispatch(fetchPersonData(Number(id)));
  }, [id]);

  return status === "loading" ? (
    <Loader />
  ) : (
    <>{details && Object.keys(details).length > 0 && <PersonContent />}</>
  );
};

export default Person;
