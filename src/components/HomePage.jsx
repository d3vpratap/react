import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/auth/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
