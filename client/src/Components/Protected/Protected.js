import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = () => {
  const token2 = JSON.parse(localStorage.getItem("user"))?.status;

  return token2 ? <Outlet /> : <Navigate to="/login" />;
};


export const AdminRoutes = () => {
  const admin = JSON.parse(localStorage.getItem("admin"))?.email;

  return admin ? (
    <Outlet />
  ) : (
    <Navigate to="/adminlogin" />
  );
};

export default UserRoutes;
