import { ActiveRankingFilters, Movies } from "@/types/types";

export const getMoviesRankingData = async (
  sortBy = "vote_average.desc",
  filters?: ActiveRankingFilters
) => {
  const { originalLanguage, genre, productionYear } = filters || {};
  const url = `${process.env.NEXT_PUBLIC_BASE_DISCOVER_API_URL}movie?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&sort_by=${sortBy}&vote_count.gte=500${
    originalLanguage ? `&with_original_language=${originalLanguage}` : ""
  }${genre ? `&with_genres=${genre}` : ""}${
    productionYear ? `&primary_release_year=${productionYear}` : ""
  }`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const movies: Movies = await response.json();
    return movies;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies ranking data");
  }
};

export const getTvSeriesRankingData = async (
  sortBy = "vote_average.desc",
  filters?: ActiveRankingFilters
) => {
  const { originalLanguage, genre, productionYear } = filters || {};
  const url = `${process.env.NEXT_PUBLIC_BASE_DISCOVER_API_URL}tv?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&sort_by=${sortBy}&vote_count.gte=500${
    originalLanguage ? `&with_original_language=${originalLanguage}` : ""
  }${genre ? `&with_genres=${genre}` : ""}${
    productionYear ? `&primary_release_year=${productionYear}` : ""
  }`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tvSeries = await response.json();
    return tvSeries;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tv series ranking data");
  }
};
