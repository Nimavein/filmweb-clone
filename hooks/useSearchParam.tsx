import { useRouter, useSearchParams } from "next/navigation";

const useSearchParam = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParams());

  const setSearchParam = (paramName: string, paramValue: string) => {
    searchParams.set(paramName, paramValue);
    router.push(`?${searchParams}`, { scroll: false });
  };

  const removeSearchParam = (paramName: string) => {
    searchParams.delete(paramName);
    router.push(`?${searchParams}`, { scroll: false });
  };

  const getSearchParam = (paramName: string) => {
    return searchParams.get(paramName);
  };

  return {
    setSearchParam,
    removeSearchParam,
    getSearchParam,
  };
};

export default useSearchParam;
