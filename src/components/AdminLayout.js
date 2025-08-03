import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div>
          <h2 style={styles.title}>Monitoring Angkot</h2>
          <nav style={styles.nav}>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/peta" style={styles.link}>Peta</Link>
            <Link to="/statistik" style={styles.link}>Statistik</Link>
            <Link to="/hitungbiaya" style={styles.link}>Hitung Tarif</Link>
            
          </nav>
        </div>
        <button style={styles.logoutButton} onClick={handleLogout}>Keluar</button>
      </div>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'sans-serif'
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#202428',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px 0'
  },
  title: {
    marginBottom: '20px',
    fontSize: '20px',
    textAlign: 'center'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '0 20px'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background 0.2s',
  },
  logoutButton: {
    backgroundColor: '#d33',
    border: 'none',
    padding: '10px 20px',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '4px',
    margin: '0 20px'
  },
  content: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: '20px'
  }
};
