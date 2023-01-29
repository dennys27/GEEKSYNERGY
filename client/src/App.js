import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import UserRoutes, { AdminRoutes } from "./Components/Protected/Protected";
import Edit from "./Components/Edit/Edit";
import AdminHero from "./Components/AdminHome/AdminHero";
import Adminlogin from "./Components/AdminLogin/Adminlogin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<UserRoutes />}>
          <Route element={<Home />} path="/" />
        </Route>

        <Route element={<Signup />} path="/signup" />
        <Route element={<Login />} path="/login" />
      </Routes>

      <Routes>
        <Route element={<AdminRoutes />}>
          <Route element={<AdminHero />} path="/admin" />
          <Route element={<Edit />} path="/edit" />
        </Route>
        <Route element={<Adminlogin />} path="/adminlogin" />
      </Routes>
    </div>
  );
}

export default App;
