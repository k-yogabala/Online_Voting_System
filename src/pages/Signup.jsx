import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async () => {
    setError("");

    if (!username || !email || !password) {
      setError("⚠️ All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      setError("⚠️ Please enter a valid email!");
      return;
    }

    

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Signup failed");
      console.log(error);
    }
  };

  return (
    <div className="center-layout">
      <div className="auth-container">
        <h2>🔐 SignUp</h2>
        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          className="input-box"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button className="login-btn" onClick={handleSignup}>SignUp</button>
      </div>
    </div>
  );
};

export default Signup;
