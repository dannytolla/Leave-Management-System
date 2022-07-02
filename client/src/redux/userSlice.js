import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCalls from "./apiCalls";

const initialState = {
  data: null,
  requests: [],
  isError: false,
  isLoading: false,
  errorMessage: "",
};

export const getMe = createAsyncThunk("get-me", async (_, thunkApi) => {
  try {
    const userId = thunkApi.getState().auth.user.userId;
    return await apiCalls.getUser(userId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const getRequests = createAsyncThunk(
  "get-requests",
  async (_, thunkApi) => {
    try {
      const userId = thunkApi.getState().auth.user.userId;
      return await apiCalls.getRequests(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = "";
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = action.payload;
      })
      .addCase(getRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
