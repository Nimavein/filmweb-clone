"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ApiStatus,
  CollectionDetails,
  MovieDetails,
  Reviews,
  WatchProviders,
} from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MovieState {
  movieDetails: MovieDetails | null;
  reviews: Reviews | null;
  watchProviders: WatchProviders | null;
  collection: CollectionDetails | null;
  status: ApiStatus;
  reviewsStatus: ApiStatus;
  collectionStatus: ApiStatus;
  error: string | null;
}

const initialState: MovieState = {
  movieDetails: null,
  reviews: null,
  watchProviders: null,
  collection: null,
  status: "idle",
  reviewsStatus: "idle",
  collectionStatus: "idle",
  error: null,
};

export const fetchMovieData = createAsyncThunk<
  { movieDetails: MovieDetails; watchProviders: WatchProviders },
  number,
  { rejectValue: string }
>("movieData/fetchMovieData", async (movie_id, { rejectWithValue }) => {
  try {
    const [movieDetails, watchProviders] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${movie_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,videos,credits`
      ).then((res) => res.json()) as Promise<MovieDetails>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${movie_id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<WatchProviders>,
    ]);
    return { movieDetails, watchProviders: watchProviders };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchMovieReviews = createAsyncThunk<
  Reviews,
  { movie_id: number; page: number }
>(
  "movieData/fetchMovieReviews",
  async ({ movie_id, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${movie_id}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
      );

      const data = await response.json();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCollectionData = createAsyncThunk<
  CollectionDetails,
  number,
  { rejectValue: string }
>(
  "movieData/fetchCollectionData",
  async (collection_id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_COLLECTION_API_URL}${collection_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    resetCollection: (state) => {
      state.collection = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieDetails = action.payload.movieDetails;
        state.watchProviders = action.payload.watchProviders;
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchMovieReviews.pending, (state) => {
        state.reviewsStatus = "loading";
      })
      .addCase(fetchMovieReviews.fulfilled, (state, action) => {
        state.reviewsStatus = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchMovieReviews.rejected, (state, action) => {
        state.reviewsStatus = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchCollectionData.pending, (state) => {
        state.collectionStatus = "loading";
      })
      .addCase(fetchCollectionData.fulfilled, (state, action) => {
        state.collectionStatus = "succeeded";
        state.collection = action.payload;
      })
      .addCase(fetchCollectionData.rejected, (state, action) => {
        state.collectionStatus = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default movieSlice.reducer;
export const { resetCollection } = movieSlice.actions;
