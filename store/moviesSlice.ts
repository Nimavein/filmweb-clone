import { ApiStatus, Movies } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MoviesState {
  popularMovies: Movies | null;
  status: ApiStatus;
  error: string | null;
}

const initialState: MoviesState = {
  popularMovies: null,
  status: "idle",
  error: null,
};

export const fetchPopularMovies = createAsyncThunk<Movies, { page: number }>(
  "movies/fetchPopularMovies",
  async ({ page }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies.");
    }
    const data = await response.json();
    return data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default moviesSlice.reducer;
export const {} = moviesSlice.actions;
