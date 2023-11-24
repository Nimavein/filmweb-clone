/* eslint-disable @typescript-eslint/no-explicit-any */

import { personTMDBUrl } from "./urlHelper";

export const getPopularPeople = async (page: number) => {
  try {
    const response = await fetch(
      `${personTMDBUrl}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error);
  }
};
