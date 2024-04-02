import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../actions/Team";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const AllTeams = () => {
  const { allTeams, isLoading } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      {isLoading ? (
        <div className="my-5 py-5">
          <h1 className="my-5 text-center text-secondary fw-semibold">
            Loading...
          </h1>
        </div>
      ) : (
        <div className="row d-flex justify-content-center my-4">
          <h1 className="text-center fw-semibold">All Teams</h1>
          {allTeams &&
            allTeams.map((team) => {
              return (
                <div
                  key={team._id}
                  className="col-lg-8 shadow-sm my-4 border border rounded p-4"
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3>Team: {team.teamName}</h3>
                      <h5>Leader: {team.teamLeader}</h5>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div>
                        {team.createdAt
                          ? formatDistanceToNow(new Date(team.createdAt), {
                              addSuffix: true,
                            })
                          : ""}{" "}
                      </div>
                      <div>Members: {team.selectedUsers.length}</div>
                      <div>
                        <Link
                          to={`/team/${team._id}`}
                          className="text-decoration-none"
                        >
                          View Details{" "}
                          <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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

export default AllTeams;
