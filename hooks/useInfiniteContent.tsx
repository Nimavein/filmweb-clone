import { useState, useEffect } from "react";

const useInfiniteContent = <T,>(
  fetchFunction: (pageNumber: number) => Promise<T[]>
) => {
  const [content, setContent] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchMoreData = async () => {
    const newContent = await fetchFunction(page);
    if (newContent.length > 0) {
      setContent([...content, ...newContent]);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const initialContent = await fetchFunction(page);
      setContent(initialContent);
      setPage(page + 1);
    };
    fetchData();
  }, []);

  return {
    content,
    fetchMoreData,
  };
};

export default useInfiniteContent;
