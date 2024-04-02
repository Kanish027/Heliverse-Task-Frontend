import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getAllUsers } from "./actions/User";
import Home from "./page/Home";
import CreateTeam from "./page/CreateTeam";
import AllTeams from "./page/AllTeams";
import TeamDetail from "./page/TeamDetail";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:keyword" element={<Home />} />
        <Route path="/team/create" element={<CreateTeam />} />
        <Route path="/team/all" element={<AllTeams />} />
        <Route path="/team/:id" element={<TeamDetail />} />
      </Routes>
    </div>
  );
}

export default App;
