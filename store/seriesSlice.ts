import { ApiStatus, Images, Reviews, SeriesAggregateCredits, SeriesDetails } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface SeriesState {
  details: SeriesDetails | null;
  images: Images | null;
  aggregateCredits: SeriesAggregateCredits | null;
  reviews: Reviews | null;
  status: ApiStatus;
  reviewsStatus: ApiStatus;
  error: string | null;
}

const initialState: SeriesState = {
  details: null,
  images: null,
  aggregateCredits: null,
  reviews: null,
  status: "idle",
  reviewsStatus: "idle",
  error: null,
};

export const fetchSeriesData = createAsyncThunk<
  { movieDetails: SeriesDetails; aggregateCredits: SeriesAggregateCredits; images: Images},
  number,
  { rejectValue: string }
>("seriesData/fetchSeriesData", async (tv_id, { rejectWithValue }) => {
  try {
    const [movieDetails, aggregateCredits, images] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${tv_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<SeriesDetails>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${tv_id}/aggregate_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<SeriesAggregateCredits>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_SERIES_API_URL}${tv_id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<Images>,
    ]);
    return { movieDetails, aggregateCredits, images };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchSeriesReviews = createAsyncThunk<Reviews, { tv_id: number; page: number }>(
  "seriesData/fetchSeriesReviews",
  async ({ tv_id, page }, { rejectWithValue }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${tv_id}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );

    if (!response.ok) {
      const error = await Promise.reject("Failed to fetch reviews for the `movie.");
      return rejectWithValue(error);
    }

    const data = await response.json();

    return data;
  }
);

const seriesSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeriesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload.movieDetails;
        state.aggregateCredits = action.payload.aggregateCredits;
        state.images = action.payload.images;
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
      });
  },
});

export default seriesSlice.reducer;
