/* eslint-disable @typescript-eslint/no-explicit-any */

import { News } from "@/types/types";

export const getNews = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY || "",
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPID_API_HOST || "",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_NEWS_API_URL}`,
      options
    );
    const data = await response.json();
    const news: News = data.data.newsStories;
    return news;
  } catch (error: any) {
    console.error(error);
  }
};
