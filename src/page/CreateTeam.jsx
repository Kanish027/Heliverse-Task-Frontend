import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { createTeam } from "../actions/Team";
import { allUsers } from "../actions/User";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
  const { allUser, isLoading } = useSelector((state) => state.user);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamLeaderName, setTeamLeaderName] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Configuration for columns in the DataGrid
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Avatar alt={params.row.name} src={params.row.avatar} />
      ),
    },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    { field: "gender", headerName: "Gender", minWidth: 150, flex: 0.5 },
    { field: "domain", headerName: "Domain", minWidth: 150, flex: 0.5 },
    {
      field: "availability",
      headerName: "Availability",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "select",
      headerName: "Select Users",
      type: "number",
      flex: 0.5,
      minWidth: 200,
      sortable: false,
      renderCell: (params) => (
        <input
          type="checkbox"
          disabled={
            !params.row.availability ||
            params.row.availability === "Not Available"
          } // Disable if the user is not available
          checked={selectedUsers.includes(params.row.id)}
          onChange={(e) => handleUserSelection(e, params.row.id)}
        />
      ),
    },
  ];

  // Mapping user data to rows for DataGrid
  const rows = allUser
    ? allUser.map((user) => ({
        id: user._id,
        avatar: user.avatar,
        name: user.first_name + " " + user.last_name,
        gender: user.gender,
        domain: user.domain,
        availability: user.available ? "Available" : "Not Available",
      }))
    : [];

  const handleUserSelection = (e, userId) => {
    const isChecked = e.target.checked;

    setSelectedUsers((prevSelectedUsers) =>
      isChecked
        ? [...prevSelectedUsers, userId]
        : prevSelectedUsers.filter((id) => id !== userId)
    );
  };

  const handleCreateTeam = () => {
    // Validate if teamName and teamLeaderName are not empty
    if (!teamName || !teamLeaderName) {
      console.log("Team name and team leader name are required.");
      return;
    }

    dispatch(createTeam(teamName, teamLeaderName, selectedUsers));
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <div className="container">
      {isLoading ? (
        "Loading"
      ) : (
        <div className="row my-4">
          <h1 className="mb-4 fw-bold text-center">Create Team</h1>
          <div className="col-lg-12">
            <div className="d-flex gap-4 mb-4 justify-content-center">
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Team Leader Name"
                  value={teamLeaderName}
                  onChange={(e) => setTeamLeaderName(e.target.value)}
                />
              </div>
            </div>
            <DataGrid
              columns={columns}
              rows={rows}
              disableRowSelectionOnClick
              autoHeight
              pageSizeOptions={[5, 10, 25, 100]}
            />
          </div>
          <div className="col-lg-12 text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={handleCreateTeam}
              disabled={
                selectedUsers.length === 0 || !teamName || !teamLeaderName
              }
            >
              Create Team
            </button>
          </div>
        </div>
      )}
      <div className="my-3 px-2">
        <button
          onClick={() => handleNavigate()}
          className="btn btn-dark btn-sm rounded-circle"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};

export default CreateTeam;
