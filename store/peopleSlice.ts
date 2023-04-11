import { ApiStatus, People } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface PeopleState {
  popular: People | null;
  status: ApiStatus;
  error: string | null;
}

const initialState: PeopleState = {
  popular: null,
  status: "idle",
  error: null,
};

export const fetchPopularPeople = createAsyncThunk<People, { page: number }>(
  "people/fetchPopularPeople",
  async ({ page }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PERSON_API_URL}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular people.");
    }
    const data = await response.json();
    return data;
  }
);

// Define the slice
const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularPeople.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularPeople.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popular = action.payload;
      })
      .addCase(fetchPopularPeople.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

// Export the actions and reducer
export default peopleSlice.reducer;
