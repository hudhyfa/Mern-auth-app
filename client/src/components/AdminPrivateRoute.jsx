import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminPrivateRoute() {
  const { isAdminLogged } = useSelector((state) => state.admin);
  return isAdminLogged ? <Outlet /> : <Navigate to={'/admin-login'}/>;
}

export default AdminPrivateRoute;
