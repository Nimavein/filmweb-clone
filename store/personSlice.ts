import { ApiStatus, PersonDetails, PersonImages, PersonMovieCredits, PersonTvCredits } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define a type for the slice state
interface PersonState {
  details: PersonDetails | null;
  movieCredits: PersonMovieCredits | null;
  tvCredits: PersonTvCredits | null;
  images: PersonImages | null;
  status: ApiStatus;
  error: string | null;
}

// Define the initial state using that type
const initialState: PersonState = {
  details: null,
  movieCredits: null,
  tvCredits: null,
  images: null,
  status: "idle",
  error: null,
};

export const fetchPersonData = createAsyncThunk<
  { details: PersonDetails; images: PersonImages, movieCredits: PersonMovieCredits, tvCredits: PersonTvCredits },
  number,
  { rejectValue: string }
>("personData/fetchPersonData", async (person_id, { rejectWithValue }) => {
  try {
    const [details, images, movieCredits, tvCredits] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_PERSON_API_URL}${person_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<PersonDetails>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_PERSON_API_URL}${person_id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<PersonImages>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_PERSON_API_URL}${person_id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<PersonMovieCredits>,
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_PERSON_API_URL}${person_id}/tv_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()) as Promise<PersonTvCredits>,
    ]);
    return { details, images, movieCredits, tvCredits };
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
        state.images = action.payload.images;
        state.movieCredits = action.payload.movieCredits;
        state.tvCredits = action.payload.tvCredits;
      })
      .addCase(fetchPersonData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default personSlice.reducer;
