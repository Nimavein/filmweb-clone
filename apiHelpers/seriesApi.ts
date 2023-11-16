/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Reviews,
  SeasonDetails,
  SeriesDetails,
  WatchProviders,
} from "@/types/types";

export const getSeriesData = async (tvSeriesId: number) => {
  try {
    const [seriesDetails, watchProviders] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${tvSeriesId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,videos,aggregate_credits`
      ).then((res) => res.json()) as Promise<SeriesDetails>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${tvSeriesId}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<WatchProviders>,
    ]);
    return { seriesDetails, watchProviders };
  } catch (error: any) {
    console.error(error);
  }
};

export const getSeriesReviews = async (seriesId: number, page: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${seriesId}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    const reviews: Reviews = await response.json();
    return reviews;
  } catch (error: any) {
    console.error(error);
  }
};

export const getSeriesSeasonData = async (
  seriesId: number,
  seasonNumber: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${seriesId}/season/${seasonNumber}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,videos,credits`
    );

    const seasonData: SeasonDetails = await response.json();
    return seasonData;
  } catch (error: any) {
    console.error(error);
  }
};

export const addSeriesRating = async (
  seriesId: number,
  sessionId: string,
  rating: number
) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${seriesId}/rating?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          value: rating,
        }),
      }
    );
  } catch (error: any) {
    console.error(error);
  }
};

export const deleteSeriesRating = async (seriesId: number, sessionId: string) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${seriesId}/rating?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
  } catch (error: any) {
    console.error(error);
  }
};
