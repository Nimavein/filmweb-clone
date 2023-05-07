import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWatchProviders } from "@/store/watchProvidersSlice";
import VodPageContent from "@/pages/vod/components/VodPageContent";

const VodPage = () => {
  const dispatch = useAppDispatch();
  const { tv, movies } = useAppSelector((state) => state.watchProviders);

  useEffect(() => {
    if (!tv && !movies) dispatch(fetchWatchProviders());
  }, [dispatch]);

  return <>{tv && movies && <VodPageContent />}</>;
};

export default VodPage;
