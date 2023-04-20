import { ApiStatus, SearchResults } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  results: SearchResults;
  status: ApiStatus;
  error: string | null;
}

export const searchMulti = createAsyncThunk("search/searchMulti", async (query: string) => {
  const { results } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_SEARCH_API_URL}multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`
  ).then((res) => res.json());
  return results;
});

const initialState: SearchState = {
  query: "",
  results: null,
  status: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMulti.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMulti.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(searchMulti.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
