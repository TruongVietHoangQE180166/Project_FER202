// src/Components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  try {
    const user = JSON.parse(atob(token.split('.')[1]));
    if (user.role !== "admin") return <Navigate to="/" />;
    return <Outlet />;
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;
