import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCalls from "./apiCalls";

const initialState = {
  leave: null,
  leaves: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

export const changeStatus = createAsyncThunk(
  "change-status",
  async (data, thunkApi) => {
    try {
      const userId = thunkApi.getState().auth.user.userId;
      return await apiCalls.updateStatus(userId, data);
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

export const getLeaveRequests = createAsyncThunk(
  "get-all-leave requests",
  async (_, thunkApi) => {
    try {
      const userId = thunkApi.getState().auth.user.userId;
      return await apiCalls.getLeaveRequests(userId);
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

export const getLeave = createAsyncThunk("get-leave", async (id, thunkApi) => {
  try {
    const userId = thunkApi.getState().auth.user.userId;
    return await apiCalls.getLeave(userId, id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export const createLeaveRequest = createAsyncThunk(
  "create-leave-request",
  async (data, thunkApi) => {
    try {
      const userId = thunkApi.getState().auth.user.userId;
      return await apiCalls.createLeaveRequest(userId, data);
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

export const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.name = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaveRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeaveRequests.fulfilled, (state, action) => {
        state.leaves = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getLeaveRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getLeave.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeave.fulfilled, (state, action) => {
        state.leave = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getLeave.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(changeStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.leave = { ...state.leave, status: action.payload.status };
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = leaveSlice.actions;
export default leaveSlice.reducer;
