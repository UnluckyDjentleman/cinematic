import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MovieGenre from "../../constants/types/movieGenre";
import { AxiosError } from "axios";

const initialState: {
  movieGenres: MovieGenre[];
  error: AxiosError | undefined;
  load: string | boolean | undefined;
} = {
  movieGenres: [],
  error: undefined,
  load: undefined,
};

export const genresReducer = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setMovieGenres: (
      state,
      action: PayloadAction<{
        movieGenres: MovieGenre[];
        error: AxiosError | undefined;
        load: string | boolean | undefined;
      }>
    ) => {
      (state.movieGenres = action.payload.movieGenres),
        (state.error = action.payload.error),
        (state.load = action.payload.load);
    },
  },
});

export const { setMovieGenres } = genresReducer.actions;

export default genresReducer.reducer;
