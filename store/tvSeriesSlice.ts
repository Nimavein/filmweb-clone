import { ApiStatus, TvSeries } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MoviesState {
  popularTvSeries: TvSeries | null;
  status: ApiStatus;
  error: string | null;
}

const initialState: MoviesState = {
  popularTvSeries: null,
  status: "idle",
  error: null,
};

export const fetchPopularTvSeries = createAsyncThunk<TvSeries, { page: number }>(
  "tvSeries/fetchPopularTvSeries",
  async ({ page }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular Tv series.");
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
      });
  },
});

export default tvSeriesSlice.reducer;
