import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    getUserRequest: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
      state.userCount = action.payload.userCount;
      state.filteredUsersCount = action.payload.filteredUsersCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
    getUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getAllUsersRequest: (state) => {
      state.isLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.allUser = action.payload;
    },
    getAllUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailure,
} = userSlice.actions;

export default userSlice.reducer;
