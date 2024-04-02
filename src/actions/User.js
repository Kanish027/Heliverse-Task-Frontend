import axios from "axios";
import {
  getAllUsersFailure,
  getAllUsersRequest,
  getAllUsersSuccess,
  getUserFailure,
  getUserRequest,
  getUserSuccess,
} from "../features/users/userSlice";

const getAllUsers =
  (currentPage = 1, keyword = "", domain, gender, available = null) =>
  async (dispatch) => {
    try {
      dispatch(getUserRequest());

      let link = `/api/api/v1/users?page=${currentPage}&keyword=${keyword}`;

      if (domain) {
        link += `&domain=${domain}`;
      }

      if (gender) {
        link += `&gender=${gender}`;
      }

      if (available !== null) {
        // Check if available is not null
        link += `&available=${available}`;
      }

      const { data } = await axios.get(link);

      dispatch(
        getUserSuccess({
          users: data.users,
          userCount: data.userCount,
          filteredUsersCount: data.filteredUsersCount,
          resultPerPage: data.resultPerPage,
        })
      );
    } catch (error) {
      dispatch(getUserFailure(error.response.data.message));
    }
  };

const allUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());

    const { data } = await axios.get("/api/api/v1/users/all");

    dispatch(getAllUsersSuccess(data.users));
  } catch (error) {
    dispatch(getAllUsersFailure(error.response.data.message));
  }
};

export { getAllUsers, allUsers };
