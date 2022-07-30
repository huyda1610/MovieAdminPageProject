import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import theaterAPI from "../Services/theaterAPI";

const initialState = {
  theater: [],
  boxOfficeInfo:[],
  scheduleIsSuccess: null,
};

export const getTheaterInfo = createAsyncThunk(
  "theater/getTheaterInfo",
  async () => {
    try {
      const data = await theaterAPI.getTheaterInfo();
      return data;
    } catch (error) {
        throw error;
    }
  }
);

export const getBoxOfficeInfo = createAsyncThunk(
  "theater/getBoxOfficeInfo",
  async (theaterId) => {
    try {
      const data = await theaterAPI.getBoxOfficeInfo(theaterId);
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const createMovieSchedule = createAsyncThunk(
  "theater/createMovieSchedule",
  async (schedule ) => {
    try {
      await theaterAPI.createMovieSchedule(schedule);
    } catch (error) {
      console.log(error);
    }
  }
);

const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {;
    builder.addCase(getTheaterInfo.fulfilled, (state, { payload }) => {
      state.theater = payload;
    });
    builder.addCase(getBoxOfficeInfo.fulfilled, (state, { payload }) => {
      state.boxOfficeInfo = payload;
    });

    builder.addCase(createMovieSchedule.pending, (state ) => {
      state.scheduleIsSuccess = null;
    });
    builder.addCase(createMovieSchedule.fulfilled, (state, { payload }) => {
      state.scheduleIsSuccess = true;
    });
    builder.addCase(createMovieSchedule.rejected, (state ) => {
      state.scheduleIsSuccess = undefined;
    });
  },
});

// export actions
// export const {getMovieId} = movieSlice.actions;
// export reducer
export default theaterSlice.reducer;
