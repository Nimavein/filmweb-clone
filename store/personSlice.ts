import { ApiStatus, PersonDetails, PersonImages, PersonMovieCredits, PersonTvCredits } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define a type for the slice state
interface PersonState {
  details: PersonDetails | null;
  status: ApiStatus;
  error: string | null;
}

// Define the initial state using that type
const initialState: PersonState = {
  details: null,
  status: "idle",
  error: null,
};

export const fetchPersonData = createAsyncThunk<
  { details: PersonDetails; },
  number,
  { rejectValue: string }
>("personData/fetchPersonData", async (person_id, { rejectWithValue }) => {
  try {
    const [details] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_PERSON_API_URL}${person_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,movie_credits,tv_credits,tagged_images`
      ).then((res) => res.json()) as Promise<PersonDetails>,
    ]);
    return { details };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const personSlice = createSlice({
  name: "personData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPersonData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload.details;
      })
      .addCase(fetchPersonData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default personSlice.reducer;
