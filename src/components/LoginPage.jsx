import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateInput = () => {
    if (username !== "emilys") {
      return "Username must be 'emilys'";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, expiresInMins: 30 }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/home");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Error connecting to the server");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <button>Login with Google</button>
      <button>Login with Facebook</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="checkbox-container">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <a href="#">Register</a>
    </div>
  );
};

export default LoginPage;
