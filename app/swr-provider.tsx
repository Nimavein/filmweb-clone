"use client";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const SWRProvider = ({ children }: PropsWithChildren) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
