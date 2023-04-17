import { ApiStatus, GetWatchProviders } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface WatchProvidersState {
  movies: GetWatchProviders | null;
  tv: GetWatchProviders | null;
  status: ApiStatus;
  error: string | null;
  filters: {
    watchProviderId: number | null;
    filterBy: string | null;
  };
}

const initialState: WatchProvidersState = {
  movies: null,
  tv: null,
  status: "idle",
  error: null,
  filters: {
    watchProviderId: null,
    filterBy: "popularity.desc"
  }
};

export const fetchWatchProviders = createAsyncThunk<{
  movies: GetWatchProviders;
  tv: GetWatchProviders;
}>("watchProviders/fetchWatchProviders", async () => {
  try {
    const [movies, tv] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_WATCH_PROVIDERS_API_URL}movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<GetWatchProviders>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_WATCH_PROVIDERS_API_URL}tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<GetWatchProviders>,
    ]);
    return { movies, tv };
  } catch (error: any) {
    return error.message;
  }
});

const watchProvidersSlice = createSlice({
  name: "watchProviders",
  initialState,
  reducers: {
    setWatchProviderId: (state, action: PayloadAction<number | null>) => {
      state.filters.watchProviderId = action.payload;
    },
    setFilterBy: (state, action: PayloadAction<string | null>) => {
      state.filters.filterBy = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWatchProviders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.movies;
        state.tv = action.payload.tv;
      })
      .addCase(fetchWatchProviders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default watchProvidersSlice.reducer;
export const { setFilterBy, setWatchProviderId } = watchProvidersSlice.actions;