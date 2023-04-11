import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import moviesReducer from "./moviesSlice";
import movieReducer from "./movieSlice";
import personSlice from "./personSlice";
import peopleSlice from "./peopleSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movie: movieReducer,
    person: personSlice,
    people: peopleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
