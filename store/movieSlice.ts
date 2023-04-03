import { ApiStatus, MovieDetails } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define a type for the slice state
interface MovieState {
  movieDetails: MovieDetails | null;
  status: ApiStatus;
  error: string | null;
}

// Define the initial state using that type
const initialState: MovieState = {
  movieDetails: null,
  status: "idle",
  error: null,
};

// Define a thunk that will fetch movies from the movie database API
export const fetchMovieData = createAsyncThunk(
  "movies/fetchMovieData",
  async (movie_id: number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie data.");
    }
    const data = await response.json();

    return data as MovieDetails;
  }
);

// Define the slice
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
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default movieSlice.reducer;
