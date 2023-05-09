"use client";

import { ApiStatus, TvSeries } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface TvSeriesState {
  popularTvSeries: TvSeries | null;
  watchProviderTvSeries: TvSeries | null;
  status: ApiStatus;
  error: string | null;
}

const initialState: TvSeriesState = {
  popularTvSeries: null,
  watchProviderTvSeries: null,
  status: "idle",
  error: null,
};

export const fetchPopularTvSeries = createAsyncThunk<
  TvSeries,
  { page: number }
>("tvSeries/fetchPopularTvSeries", async ({ page }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}&vote_count.gte=100`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular Tv series.");
  }
  const data = await response.json();
  return data;
});

export const fetchWatchProviderTvSeries = createAsyncThunk<
  TvSeries,
  { page?: number; providerId?: number | null; filterBy: string | null }
>(
  "tvSeries/fetchWatchProviderTvSeries",
  async ({ page = 1, providerId, filterBy }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}discover/tv?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}${
        providerId !== null ? `&with_watch_providers=${providerId}` : ""
      }${filterBy !== null ? `&sort_by=${filterBy}` : ""}&vote_count.gte=100`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch watch provider tv series.");
    }
    const data = await response.json();
    return data;
  }
);

const tvSeriesSlice = createSlice({
  name: "tvSeries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularTvSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularTvSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularTvSeries = action.payload;
      })
      .addCase(fetchPopularTvSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchWatchProviderTvSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWatchProviderTvSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.watchProviderTvSeries = action.payload;
      })
      .addCase(fetchWatchProviderTvSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default tvSeriesSlice.reducer;
