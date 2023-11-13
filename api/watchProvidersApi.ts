/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetWatchProviders } from "@/types/types";

export const getWatchProviders = async () => {
  try {
    const [moviesProviders, tvProviders] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_WATCH_PROVIDERS_API_URL}movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<GetWatchProviders>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_WATCH_PROVIDERS_API_URL}tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<GetWatchProviders>,
    ]);
    return { moviesProviders, tvProviders };
  } catch (error: any) {
    return error.message;
  }
};
