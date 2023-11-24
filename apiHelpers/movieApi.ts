/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CollectionDetails,
  MovieDetails,
  Reviews,
  WatchProviders,
} from "@/types/types";
import { collectionTMDBUrl, movieTMDBUrl } from "./urlHelper";

export const getMovieData = async (movieId: number) => {
  try {
    const [movieDetails, watchProviders] = await Promise.all([
      fetch(
        `${movieTMDBUrl}${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,videos,credits`
      ).then((res) => res.json()) as Promise<MovieDetails>,
      fetch(
        `${movieTMDBUrl}${movieId}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<WatchProviders>,
    ]);
    return { movieDetails, watchProviders };
  } catch (error: any) {
    console.error(error);
  }
};

export const getMovieReviews = async (movieId: number, page: number) => {
  try {
    const response = await fetch(
      `${movieTMDBUrl}${movieId}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    const reviews: Reviews = await response.json();
    return reviews;
  } catch (error: any) {
    console.error(error);
  }
};

export const getMovieCollection = async (collectionId: number) => {
  try {
    const response = await fetch(
      `${collectionTMDBUrl}${collectionId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const collection: CollectionDetails = await response.json();
    return collection;
  } catch (error: any) {
    console.error(error);
  }
};

export const addMovieRating = async (
  movieId: number,
  sessionId: string,
  rating: number
) => {
  try {
    await fetch(
      `${movieTMDBUrl}${movieId}/rating?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

export const deleteMovieRating = async (movieId: number, sessionId: string) => {
  try {
    await fetch(
      `${movieTMDBUrl}${movieId}/rating?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error(error);
  }
};
