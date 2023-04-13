import {
  ApiStatus,
  MovieDetails,
  Reviews,
} from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MovieState {
  movieDetails: MovieDetails | null;
  reviews: Reviews | null;
  status: ApiStatus;
  reviewsStatus: ApiStatus;
  error: string | null;
}

const initialState: MovieState = {
  movieDetails: null,
  reviews: null,
  status: "idle",
  reviewsStatus: "idle",
  error: null,
};

export const fetchMovieData = createAsyncThunk<
  { movieDetails: MovieDetails; },
  number,
  { rejectValue: string }
>("movieData/fetchMovieData", async (movie_id, { rejectWithValue }) => {
  try {
    const [movieDetails] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${movie_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,videos,credits`
      ).then((res) => res.json()) as Promise<MovieDetails>,
    ]);
    return { movieDetails };
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}${movie_id}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );

    if (!response.ok) {
      const error = await Promise.reject(
        "Failed to fetch reviews for the `movie."
      );
      return rejectWithValue(error);
    }

    const data = await response.json();

    return data;
  }
);

const movieSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieDetails = action.payload.movieDetails;
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
      });
  },
});

export default movieSlice.reducer;
