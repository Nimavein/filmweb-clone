import { ApiStatus, Reviews, SeriesDetails } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface SeriesState {
  details: SeriesDetails | null;
  reviews: Reviews | null;
  season: any;
  status: ApiStatus;
  reviewsStatus: ApiStatus;
  seasonStatus: ApiStatus;
  error: string | null;
}

const initialState: SeriesState = {
  details: null,
  reviews: null,
  season: null,
  status: "idle",
  reviewsStatus: "idle",
  seasonStatus: "idle",
  error: null,
};

export const fetchSeriesData = createAsyncThunk<
  { details: SeriesDetails },
  number,
  { rejectValue: string }
>("seriesData/fetchSeriesData", async (tv_id, { rejectWithValue }) => {
  try {
    const [details] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${tv_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,videos,aggregate_credits`
      ).then((res) => res.json()) as Promise<SeriesDetails>,
    ]);
    return { details };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchSeriesReviews = createAsyncThunk<Reviews, { tv_id: number; page: number }>(
  "seriesData/fetchSeriesReviews",
  async ({ tv_id, page }, { rejectWithValue }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${tv_id}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );

    if (!response.ok) {
      const error = await Promise.reject("Failed to fetch reviews of the series.");
      return rejectWithValue(error);
    }

    const data = await response.json();

    return data;
  }
);

export const fetchSeriesSeasonData = createAsyncThunk<
  any,
  { tv_id: number; season_number: number }
>("seriesData/fetchSeriesSeasonData", async ({ tv_id, season_number }, { rejectWithValue }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${tv_id}/season/${season_number}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,videos,credits`
  );

  if (!response.ok) {
    const error = await Promise.reject("Failed to fetch seasons of the series.");
    return rejectWithValue(error);
  }

  const data = await response.json();

  return data;
});

const seriesSlice = createSlice({
  name: "seriesData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeriesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload.details;
      })
      .addCase(fetchSeriesData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchSeriesReviews.pending, (state) => {
        state.reviewsStatus = "loading";
      })
      .addCase(fetchSeriesReviews.fulfilled, (state, action) => {
        state.reviewsStatus = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchSeriesReviews.rejected, (state, action) => {
        state.reviewsStatus = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchSeriesSeasonData.pending, (state) => {
        state.seasonStatus = "loading";
      })
      .addCase(fetchSeriesSeasonData.fulfilled, (state, action) => {
        state.seasonStatus = "succeeded";
        state.season = action.payload;
      })
      .addCase(fetchSeriesSeasonData.rejected, (state, action) => {
        state.seasonStatus = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default seriesSlice.reducer;
