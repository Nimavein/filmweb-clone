import {
  SearchResults,
  SeriesDetails,
  MovieDetails,
  PersonDetails,
} from "@/types/types";
import { searchTMDBUrl } from "./urlHelper";

export const getSearchMulti = async (query: string) => {
  if (query) {
    let page = 1;
    const results: SearchResults = [];

    while (page < 10) {
      const response = await fetch(
        `${searchTMDBUrl}multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&page=${page}`
      );
      const data = await response.json();
      const pageResults = data.results.filter(
        (result: SeriesDetails | MovieDetails | PersonDetails) =>
          result?.popularity && result.popularity > 10
      );
      results.push(...pageResults);
      page++;
    }

    return results;
  }
};
