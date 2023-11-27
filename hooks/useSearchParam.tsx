import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useSearchParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams());

  const setSearchParam = (paramName: string, paramValue: string | string[]) => {
    if (Array.isArray(paramValue)) {
      searchParams.set(paramName, paramValue.join(","));
    } else {
      searchParams.set(paramName, paramValue);
    }
    router.push(`?${searchParams}`, { scroll: false });
  };

  const removeSearchParam = (paramName: string) => {
    searchParams.delete(paramName);
    router.push(`?${searchParams}`, { scroll: false });
  };

  const removeAllSearchParams = () => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.forEach((value, key) => {
      currentSearchParams.delete(key);
    });

    router.push(pathname, { scroll: false });
  };

  const getSearchParam = (paramName: string) => {
    return searchParams.get(paramName);
  };

  return {
    setSearchParam,
    removeSearchParam,
    getSearchParam,
    removeAllSearchParams,
  };
};

export default useSearchParam;
