import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    createTeamRequest: (state) => {
      state.isLoading = true;
    },
    createTeamSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    createTeamFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getAllTeamsRequest: (state) => {
      state.isLoading = true;
    },
    getAllTeamsSuccess: (state, action) => {
      state.isLoading = false;
      state.allTeams = action.payload;
    },
    getAllTeamsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getTeamDetailsRequest: (state) => {
      state.isLoading = true;
    },
    getTeamDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.teamDetails = action.payload;
    },
    getTeamDetailsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createTeamRequest,
  createTeamSuccess,
  createTeamFailure,
  getAllTeamsRequest,
  getAllTeamsSuccess,
  getAllTeamsFailure,
  getTeamDetailsRequest,
  getTeamDetailsSuccess,
  getTeamDetailsFailure,
} = teamSlice.actions;

export default teamSlice.reducer;
