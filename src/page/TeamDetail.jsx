import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamDetails } from "../actions/Team";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import { formatDistanceToNow } from "date-fns";

const TeamDetail = () => {
  const { teamDetails, isLoading } = useSelector((state) => state.team);

  console.log(teamDetails);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getTeamDetails(id));
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="my-4 text-center">Team Details</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10 border p-4 rounded border-secondary-subtle">
          <div className="d-flex justify-content-between">
            <div>Team Name: {teamDetails && teamDetails.teamName}</div>
            <div className="d-flex gap-5">
              <div>Team Leader: {teamDetails && teamDetails.teamLeader}</div>
              <div>
                <small>
                  <span className="px-1">Created:</span>
                  {teamDetails && teamDetails.createdAt
                    ? formatDistanceToNow(new Date(teamDetails.createdAt), {
                        addSuffix: true,
                      })
                    : ""}
                </small>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5 className="mb-0">Team Members:</h5>
          </div>
          {isLoading ? (
            <div className="my-5 py-5">
              <h1 className="my-5 text-center text-secondary fw-semibold">
                Loading...
              </h1>
            </div>
          ) : (
            <div className="row gy-4 my-1">
              {teamDetails &&
                teamDetails.selectedUsers &&
                teamDetails.selectedUsers.map((user) => {
                  return (
                    <div key={user.id} className="col-lg-3">
                      <UserCard
                        firstName={user.first_name}
                        lastName={user.last_name}
                        avatar={user.avatar}
                        email={user.email}
                        gender={user.gender}
                        availability={user.available}
                        domain={user.domain}
                      />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
