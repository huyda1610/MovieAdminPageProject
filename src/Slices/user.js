import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../Services/userAPI";

const initialState = {
  user: [],
  userEdit: [],
  account: null,
  userIsLoading : false,
  userDeleteMessage: null,
  userMessage: null,
};

export const getUserShowing = createAsyncThunk(
  "user/getUserShowing",
  async () => {
    try {
      const data = await userAPI.getUserShowing();
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (account) => {
    try {
      const data = await userAPI.getUserDetails(account);
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (account) => {
    try {
      const data = await userAPI.deleteUser(account);
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (user) => {
    try {
      const data = await userAPI.addNewUser(user);
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const submitEditUser = createAsyncThunk(
  "user/submitEditUser",
  async (user) => {
    try {
      const data = await userAPI.submitEditUser(user);
      return data;
    } catch (error) {
      throw error
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAccount: (state , {payload}) => {
      state.account = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserShowing.pending, (state) => {
      state.userIsLoading = true;
    });
    builder.addCase(getUserShowing.fulfilled, (state, { payload }) => {
      state.userIsLoading = false;
      state.user = payload;
    });
    builder.addCase(getUserShowing.rejected, (state, { error }) => {
      state.userIsLoading = true;
      state.user = error;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.userDeleteMessage = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.userDeleteMessage = payload;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.userDeleteMessage = undefined;
    });

    builder.addCase(addNewUser.pending, (state) => {
      state.userMessage = null;
    });
    builder.addCase(addNewUser.fulfilled, (state, { payload }) => {
      state.userMessage = payload;
    });
    builder.addCase(addNewUser.rejected, (state) => {
      state.userMessage = undefined;
    });

    builder.addCase(getUserDetails.pending, (state) => {
      state.userIsLoading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.userEdit = payload;
      state.userIsLoading = false;
    });
    builder.addCase(getUserDetails.rejected, (state, { payload }) => {
      state.userEdit = payload;
      state.userIsLoading = true;
    });

    builder.addCase(submitEditUser.pending, (state) => {
      state.userMessage = null;
    });
    builder.addCase(submitEditUser.fulfilled, (state, { payload }) => {
      state.userMessage = payload;
    });
    builder.addCase(submitEditUser.rejected, (state) => {
      state.userMessage = undefined;
    });
  },
});

// export actions
export const {getAccount} = userSlice.actions;
// export reducer
export default userSlice.reducer;