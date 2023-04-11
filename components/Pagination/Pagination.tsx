import React from "react";
import { Pagination as AntdPagination } from "antd";
import type { PaginationProps as AntdPaginationProps } from "antd";

interface PaginationProps {
  totalItemsAmount: number | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  hideOnSinglePage?: boolean;
}

const Pagination = ({
  totalItemsAmount,
  currentPage,
  setCurrentPage,
  pageSize,
  hideOnSinglePage = true,
}: PaginationProps) => {
  const onChange: AntdPaginationProps["onChange"] = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  return (
    <AntdPagination
      onChange={onChange}
      defaultCurrent={1}
      total={totalItemsAmount}
      current={currentPage}
      pageSize={pageSize}
      hideOnSinglePage={hideOnSinglePage}
      showSizeChanger={false}
    />
  );
};

export default Pagination;
