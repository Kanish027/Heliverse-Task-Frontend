import axios from "axios";
import {
  createTeamFailure,
  createTeamRequest,
  createTeamSuccess,
  getAllTeamsFailure,
  getAllTeamsRequest,
  getAllTeamsSuccess,
  getTeamDetailsFailure,
  getTeamDetailsRequest,
  getTeamDetailsSuccess,
} from "../features/team/teamSlice";
import { toast } from "react-hot-toast";

const createTeam =
  (teamName, teamLeaderName, selectedUsers) => async (dispatch) => {
    try {
      dispatch(createTeamRequest());

      const { data } = await axios.post(
        "/api/api/v1/team",
        {
          teamName: teamName,
          teamLeaderName: teamLeaderName,
          selectedUserIds: selectedUsers, // Change this to selectedUserIds
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(createTeamSuccess(data.message));
      toast.success(data.message);
    } catch (error) {
      dispatch(createTeamFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

const getAllTeams = () => async (dispatch) => {
  try {
    dispatch(getAllTeamsRequest());

    const { data } = await axios.get("/api/api/v1/teams");

    dispatch(getAllTeamsSuccess(data.teams));
  } catch (error) {
    dispatch(getAllTeamsFailure(error.response.data.message));
  }
};

const getTeamDetails = (id) => async (dispatch) => {
  try {
    dispatch(getTeamDetailsRequest());

    const { data } = await axios.get(`/api/api/v1/team/${id}`);

    dispatch(getTeamDetailsSuccess(data.teamDetail));
  } catch (error) {
    dispatch(getTeamDetailsFailure(error.response.data.message));
  }
};

export { createTeam, getAllTeams, getTeamDetails };
