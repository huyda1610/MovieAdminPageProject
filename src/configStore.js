import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'

import movie from "./Slices/movie";
import auth from "./Slices/auth";
import user from "./Slices/user";
import theater from "./Slices/theater";

// const debounceNotify = _.debounce(notify => notify());

const store = configureStore({
  reducer: {
    movie,
    auth,
    user,
    theater
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;