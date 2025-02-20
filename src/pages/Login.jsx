import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("⚠️ All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      setError("⚠️ Please enter a valid email!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      const { message, role } = response.data;

      alert(message);

      const userData = { email, role };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      if (email === "admin@gmail.com" && password === "1234") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
      console.log("Login Error:", error);
    }
  };

  return (
    <div className="center-layout">
      <div className="auth-container">
        <h2>🔐 Login</h2>
        {error && <p className="error-text">{error}</p>}
        
        <input
          type="email"
          className="input-box"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input-box"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
