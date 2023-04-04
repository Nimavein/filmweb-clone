import React from "react";
import { Pagination as AntdPagination } from "antd";
import type { PaginationProps as AntdPaginationProps } from "antd";

interface PaginationProps {
  totalItemsAmount: number | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}

const Pagination = ({
  totalItemsAmount,
  currentPage,
  setCurrentPage,
  pageSize,
}: PaginationProps) => {
  const onChange: AntdPaginationProps["onChange"] = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <AntdPagination
      onChange={onChange}
      defaultCurrent={1}
      total={totalItemsAmount}
      current={currentPage}
      pageSize={pageSize}
    />
  );
};

export default Pagination;
