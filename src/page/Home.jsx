import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../actions/User";
import UserCard from "../components/UserCard";

const domains = [
  "IT",
  "Management",
  "Marketing",
  "Finance",
  "UI Designing",
  "Sales",
  "Business Development",
];

const genders = [
  "Male",
  "Female",
  "Agender",
  "Bigender",
  "Non-binary",
  "Polygender",
  "Genderqueer",
  "Genderfluid",
];

const Home = () => {
  const { users, filteredUsersCount, resultPerPage, userCount, isLoading } =
    useSelector((state) => state.user);

  const [domain, setDomain] = useState("");

  const [gender, setGender] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [available, setAvailable] = useState(null);

  const [keyword, setKeyword] = useState("");

  const { keyword: searchKey } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const count =
    userCount && resultPerPage
      ? Math.ceil(filteredUsersCount / resultPerPage)
      : 0;

  const handleChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleSearchUser = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleChangeAvailability = (e) => {
    const value = e.target.value === "true"; // Convert string to boolean
    setAvailable(value);
  };

  useEffect(() => {
    dispatch(getAllUsers(currentPage, searchKey, domain, gender, available));
  }, [dispatch, currentPage, searchKey, domain, gender, available]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 vh-auto border">
          <div className="my-4">
            <h4 className="text-center fw-semibold">Filters</h4>
            <div className="my-3 rounded">
              <div className="p-2">
                <h6>Domain</h6>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleDomainChange}
                  value={domain}
                >
                  <option value="">All Domains</option>
                  {domains.map((domain, index) => (
                    <option key={index} value={domain}>
                      {domain}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="p-2">
                <h6>Gender</h6>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleGenderChange}
                  value={gender}
                >
                  <option value="">All Genders</option>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="p-2">
                <h6>Availability</h6>
                <Form.Group>
                  <Form.Check
                    inline
                    label="Available"
                    name="availability"
                    type="radio"
                    id="available"
                    value="true"
                    onChange={handleChangeAvailability}
                    checked={available === true}
                  />
                  <Form.Check
                    inline
                    label="Unavailable"
                    name="availability"
                    type="radio"
                    id="unavailable"
                    value="false"
                    onChange={handleChangeAvailability}
                    checked={available === false}
                  />
                </Form.Group>
              </div>
              <div className="my-4 px-3">
                <Link
                  to={"/team/all"}
                  className="text-decoration-none text-primary"
                >
                  All Teams <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <div className=" py-4 my-4 d-grid">
                <Link to={"/team/create"} className="btn btn-dark">
                  Create Team
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="container-fluid my-4">
            <h1 className="my-4 fw-bold text-center">All Users</h1>
            <div className="row my-4 d-flex justify-content-center">
              <div className="col-lg-6">
                <form className="d-flex" onSubmit={handleSearchUser}>
                  <input
                    type="search"
                    className="form-control search rounded-0 rounded-start-3 border-secondary-subtle"
                    placeholder="Search User"
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                  />
                  <button className="btn btn-dark rounded-0 rounded-end-3">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
            </div>
            {isLoading ? (
              <div className="my-5 py-5">
                <h1 className="my-5 text-center text-secondary fw-semibold">
                  Loading...
                </h1>
              </div>
            ) : (
              <div className="row gy-4">
                {users &&
                  users.map((user) => {
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
            {isLoading ? null : (
              <div>
                {resultPerPage < filteredUsersCount && (
                  <div className="d-flex justify-content-center my-5">
                    {/* Pagination */}
                    <Pagination
                      color="primary"
                      count={count}
                      size="large"
                      page={currentPage}
                      variant="outlined"
                      shape="rounded"
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
