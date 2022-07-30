import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";

const initialState = {
  movies: [],
  movieEdit:[],
  addMovieMessage: null,
  error: null,
  movieId: 0,
  deleteMessage: null,
  movieIsLoading : false,
};

export const getMovieShowing = createAsyncThunk(
  "movie/getMovieShowing",
  async () => {
    try {
      const data = await movieAPI.getMovieShowing();
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const getMovieDetails = createAsyncThunk(
  "movie/getMovieDetail",
  async (movieId) => {
    try {
      const data = await movieAPI.getMovieDetails(movieId);
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const addNewMovie = createAsyncThunk(
  "movie/addNewMovie",
  async (movie) => {
    try {
      const data = await movieAPI.addNewMovie(movie);
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (movieId) => {
    try {
      const data = await movieAPI.deleteMovie(movieId);
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const submitEditMovie = createAsyncThunk(
  "movie/submitEditMovie",
  async (movie) => {
    try {
      const data = await movieAPI.submitEditMovie(movie);
      if ((typeof data) === "string") {
        return false;
      } else {
        return true;
      };
    } catch (error) {
      throw error
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovieId: (state , {payload}) => {
      state.movieId = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieShowing.pending, (state, { payload }) => {
      state.movieIsLoading = true;
      state.movies = payload;
    });
    builder.addCase(getMovieShowing.fulfilled, (state, { payload }) => {
      state.movieIsLoading = false;
      state.movies = payload;
    });
    builder.addCase(getMovieShowing.rejected, (state, { error }) => {
      state.movieIsLoading = true;
      state.error = error;
    });

    builder.addCase(addNewMovie.pending, (state,) => {
      state.addMovieMessage = null;
    });
    builder.addCase(addNewMovie.fulfilled, (state, { payload }) => {
      state.addMovieMessage = payload;
    });
    builder.addCase(addNewMovie.rejected, (state, { payload }) => {
      state.addMovieMessage = payload;
    });

    builder.addCase(deleteMovie.pending, (state,) => {
      state.deleteMessage = null;
    });
    builder.addCase(deleteMovie.fulfilled, (state, { payload }) => {
      state.deleteMessage = payload;
    });
    builder.addCase(deleteMovie.rejected, (state, { error }) => {
      state.deleteMessage = error;
    });

    builder.addCase(getMovieDetails.pending, (state) => {
      state.movieIsLoading = true;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
      state.movieIsLoading = false;
      state.movieEdit = payload;
    });
    builder.addCase(getMovieDetails.rejected, (state) => {
      state.movieIsLoading = true;
    });

    builder.addCase(submitEditMovie.pending, (state,) => {
      state.addMovieMessage = null;
    });
    builder.addCase(submitEditMovie.fulfilled, (state, { payload }) => {
      state.addMovieMessage = payload;
    });
    builder.addCase(submitEditMovie.rejected, (state, { error }) => {
      state.addMovieMessage = error;
    });
  },
});

// export actions
export const {getMovieId} = movieSlice.actions;
// export reducer
export default movieSlice.reducer;
