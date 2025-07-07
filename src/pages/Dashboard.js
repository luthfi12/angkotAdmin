import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row">
        <div className="col-md-2 bg-dark text-white p-3 min-vh-100">
          <h4 className="mb-4">Monitoring Angkot</h4>
          <ul className="nav flex-column">
            <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/pengguna">Pengguna</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/peta">Peta</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/statistik">Statistik</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/">Keluar</Link></li>
          </ul>
        </div>
        <div className="col-md-10 p-4">
          <h2>Selamat Datang, Admin</h2>
          <p>Ini halaman Dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
