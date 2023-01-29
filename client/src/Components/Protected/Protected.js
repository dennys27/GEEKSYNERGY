import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = () => {
  const token2 = JSON.parse(localStorage.getItem("user"))?.token;

  return token2 ? <Outlet /> : <Navigate to="/login" />;
};


export const AdminRoutes = () => {
  const admin = JSON.parse(localStorage.getItem("admin"))?.token;

  return admin ? (
    <Outlet />
  ) : (
    <Navigate to="/adminlogin" />
  );
};

export default UserRoutes;
