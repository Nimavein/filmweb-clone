"use client";

import React from "react";
import { Pagination as AntdPagination } from "antd";
import type { PaginationProps as AntdPaginationProps } from "antd";
import useSearchParam from "@/hooks/useSearchParam";

interface PaginationProps {
  totalItemsAmount: number | undefined;
  currentPage: number;
  pageSize?: number;
  hideOnSinglePage?: boolean;
  searchParam?: string;
  scrollToTop?: boolean;
}

const Pagination = ({
  totalItemsAmount,
  currentPage,
  pageSize = 20,
  hideOnSinglePage = true,
  searchParam = "page",
  scrollToTop = true
}: PaginationProps) => {
  const { setSearchParam } = useSearchParam();

  const onChange: AntdPaginationProps["onChange"] = (page: number) => {
    setSearchParam(searchParam, page.toString());
    if (scrollToTop) window.scrollTo({ top: 0 });
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
