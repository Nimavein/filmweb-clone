import { ApiStatus, Movie } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define a type for the slice state
interface MoviesState {
  popularMovies: Movie[];
  status: ApiStatus;
  error: string | null;
}

// Define the initial state using that type
const initialState: MoviesState = {
  popularMovies: [],
  status: "idle",
  error: null,
};

// Define a thunk that will fetch movies from the movie database API
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MOVIE_API_URL}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies.");
    }
    const data = await response.json();
    return data.results as Movie[];
  }
);

// Define the slice
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

// Export the actions and reducer
export default moviesSlice.reducer;
export const {} = moviesSlice.actions;
