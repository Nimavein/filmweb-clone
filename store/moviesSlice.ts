import { ApiStatus, Movie } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define a type for the slice state
interface MoviesState {
  movies: Movie[];
  status: ApiStatus;
  error: string | null;
}

// Define the initial state using that type
const initialState: MoviesState = {
  movies: [],
  status: "idle",
  error: null,
};

// Define a thunk that will fetch movies from the movie database API
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies.");
  }
  const data = await response.json();
  return data.results as Movie[];
});

// Define the slice
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

// Export the actions and reducer
export default moviesSlice.reducer;
export const {} = moviesSlice.actions;
