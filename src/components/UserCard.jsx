import React from "react";
import { Avatar } from "@mui/material";

const UserCard = ({
  firstName,
  lastName,
  email,
  avatar,
  gender,
  availability,
  domain,
}) => {
  const handleEmailClick = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => alert("Email copied to clipboard"))
      .catch((err) => console.error("Failed to copy email: ", err));
  };

  const handleEmailButtonClick = () => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <div className="card bg-dark">
      <div className="text-center py-2 rounded rounded-bottom-0 fw-semibold h5 bg-light">
        {firstName} {lastName}
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-center my-2">
          <Avatar
            className="bg-light"
            src={avatar}
            sx={{ width: 60, height: 60 }}
          />
        </div>
        <div className="my-3 d-flex justify-content-center align-items-center">
          <small
            className="text-light"
            onClick={handleEmailClick}
            style={{ cursor: "pointer" }}
          >
            {email}
          </small>
        </div>
        <div className="mb-3 d-flex align-items-center justify-content-between px-2">
          <small className="text-light">{gender}</small>
          <small className="text-light">{domain}</small>
        </div>
        <div className="d-grid mb-3">
          <button
            className="btn btn-light btn-sm"
            onClick={handleEmailButtonClick}
          >
            Email
          </button>
        </div>
        <div className="d-flex justify-content-end">
          <small
            className={availability === true ? "text-warning" : "text-danger"}
          >
            {availability === true ? "Available" : "Not Available"}
          </small>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
