import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row">

        <div className="col-md-10 p-4">
          <h2>Selamat Datang, Admin</h2>
          <p>Ini halaman Dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
