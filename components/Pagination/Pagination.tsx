"use client";

import React from "react";
import { Pagination as AntdPagination } from "antd";
import type { PaginationProps as AntdPaginationProps } from "antd";
import useSearchParam from "@/hooks/useSearchParam";

interface PaginationProps {
  totalItemsAmount: number | undefined;
  currentPage: number;
  pageSize: number;
  hideOnSinglePage?: boolean;
}

const Pagination = ({
  totalItemsAmount,
  currentPage,
  pageSize,
  hideOnSinglePage = true,
}: PaginationProps) => {
  const { setSearchParam } = useSearchParam();

  const onChange: AntdPaginationProps["onChange"] = (page: number) => {
    setSearchParam("page", page.toString());
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
