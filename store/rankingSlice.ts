"use client";

import {
  ActiveRankingFilters,
  ApiStatus,
  Movies,
  RankingSort,
  TvSeries,
} from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RankingState {
  sortBy: RankingSort;
  moviesRanking: Movies | null;
  tvSeriesRanking: TvSeries | null;
  moviesStatus: ApiStatus;
  tvSeriesStatus: ApiStatus;
  error: string | null;
}

const initialState: RankingState = {
  sortBy: "vote_average.desc",
  moviesRanking: null,
  tvSeriesRanking: null,
  moviesStatus: "idle",
  tvSeriesStatus: "idle",
  error: null,
};

interface RankingFilters {
  sortBy: RankingSort;
  filters?: ActiveRankingFilters;
}

export const fetchMoviesRankingData = createAsyncThunk<Movies, RankingFilters>(
  "search/fetchMoviesRankingData",
  async ({ sortBy = "vote_average.desc", filters }) => {
    const { originalLanguage, genre, productionYear } = filters || {};
    const url = `${
      process.env.NEXT_PUBLIC_BASE_DISCOVER_API_URL
    }movie?api_key=${
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
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch movies ranking data");
    }
  }
);

export const fetchTvSeriesRankingData = createAsyncThunk<
  Movies,
  RankingFilters
>(
  "search/fetchTvSeriesRankingData",
  async ({ sortBy = "vote_average.desc", filters }) => {
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
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch tv series ranking data");
    }
  }
);

const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<RankingSort>) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesRankingData.pending, (state) => {
        state.moviesStatus = "loading";
      })
      .addCase(fetchMoviesRankingData.fulfilled, (state, action) => {
        state.moviesStatus = "succeeded";
        state.moviesRanking = action.payload;
      })
      .addCase(fetchMoviesRankingData.rejected, (state, action) => {
        state.moviesStatus = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchTvSeriesRankingData.pending, (state) => {
        state.tvSeriesStatus = "loading";
      })
      .addCase(fetchTvSeriesRankingData.fulfilled, (state, action) => {
        state.tvSeriesStatus = "succeeded";
        state.tvSeriesRanking = action.payload;
      })
      .addCase(fetchTvSeriesRankingData.rejected, (state, action) => {
        state.tvSeriesStatus = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { setSortBy } = rankingSlice.actions;

export default rankingSlice.reducer;
