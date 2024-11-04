// src/Components/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Điều hướng về trang chủ sau khi logout
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage your content here.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
