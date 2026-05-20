import { Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={styles.container}>
      {/* ===== HEADER ===== */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>📦 Product Dashboard</h1>
        <div style={styles.headerRight}>
          <span style={styles.userName}>👤 {user?.full_name}</span>
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* ===== PAGE CONTENT ===== */}
      <Outlet />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: "15px 25px",
    borderRadius: "10px",
    marginBottom: "25px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "22px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  userName: {
    fontSize: "14px",
    color: "#94a3b8",
  },
  logoutBtn: {
    padding: "8px 18px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Dashboard;
