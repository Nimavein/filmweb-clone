/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CollectionDetails,
  MovieDetails,
  Reviews,
  WatchProviders,
} from "@/types/types";

export const getMovieData = async (movieId: number) => {
  try {
    const [movieDetails, watchProviders] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,videos,credits`
      ).then((res) => res.json()) as Promise<MovieDetails>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${movieId}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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
      `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${movieId}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
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
      `${process.env.NEXT_PUBLIC_BASE_COLLECTION_API_URL}${collectionId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const collection: CollectionDetails = await response.json();
    return collection;
  } catch (error: any) {
    console.error(error);
  }
};
