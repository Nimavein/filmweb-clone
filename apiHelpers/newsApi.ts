/* eslint-disable @typescript-eslint/no-explicit-any */

import { News } from "@/types/types";
import { newsTMDBUrl } from "./urlHelper";

export const getNews = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY || "",
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPID_API_HOST || "",
    },
  };

  try {
    const response = await fetch(`${newsTMDBUrl}`, options);
    const data = await response.json();
    const news: News = data.data.newsStories;
    return news;
  } catch (error: any) {
    console.error(error);
  }
};
