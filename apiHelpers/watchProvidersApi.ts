/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetWatchProviders } from "@/types/types";
import { watchProvidersTMDBUrl } from "./urlHelper";

export const getWatchProviders = async () => {
  try {
    const [moviesProviders, tvProviders] = await Promise.all([
      fetch(
        `${watchProvidersTMDBUrl}movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<GetWatchProviders>,
      fetch(
        `${watchProvidersTMDBUrl}tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<GetWatchProviders>,
    ]);
    return { moviesProviders, tvProviders };
  } catch (error: any) {
    return error.message;
  }
};
