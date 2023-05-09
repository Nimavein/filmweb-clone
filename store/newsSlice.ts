"use client";

import { News } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface NewsState {
  news: News;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  status: "idle",
  error: null,
};

const apiUrl = "https://movies-news1.p.rapidapi.com/movies_news/recent";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY || "",
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPID_API_HOST || "",
    },
  };

  const response = await fetch(apiUrl, options);
  const data = await response.json();

  return data;
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default newsSlice.reducer;
