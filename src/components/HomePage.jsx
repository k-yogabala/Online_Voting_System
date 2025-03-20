import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./style.css";

const HomePage = ({ user, setUser }) => {
  const location = useLocation(); 

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="container">
      {/* Navbar */}
      <div className="navbar">
        <h1>Vote Karo</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/help">Help/Support</Link>
          <Link to="/terms">Terms and Conditions</Link>
          {user && (
            <Link to={user.email === "admin@gmail.com" ? "/admin-dashboard" : "/dashboard"}>
              Dashboard
            </Link>
          )}
          {user && (
            <Link to={user.email === "admin@gmail.com" ? "/users" : "/vote"}>
              Voters
            </Link>
          )}
          {user ? (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li><Link to="/upcoming">Upcoming Elections</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>

      <div className="main">
        

        {location.pathname === "/" && (
  <div className="homepage-content">
   
    
    <div className="news-ticker">
      <div className="news-heading">📰 Latest Election News:</div>
      <marquee behavior="scroll" direction="left" scrollamount="5">
        🗳️ Voter registrations close on Feb 23rd | 📢 Presidential Debate scheduled for March 1st | 🔔 Voting starts on Feb 20th | 🚀 Vote securely through Vote Karo!
      </marquee>
    </div>

    <div className="features">
      <div className="feature-card">
        <h3>🗳️ Easy Voting</h3>
        <p>Cast your vote in just a few clicks with our user-friendly interface.</p>
      </div>
      <div className="feature-card">
        <h3>🔒 Secure System</h3>
        <p>Your vote is confidential and securely stored.</p>
      </div>
      <div className="feature-card">
        <h3>📅 Upcoming Elections</h3>
        <p>Stay informed about upcoming elections and important dates.</p>
      </div>
      <div className="feature-card">
        <h3>📊 Live Results</h3>
        <p>Track real-time election results as votes are counted.</p>
      </div>
      
    </div>
    <div className="cta-section">
      <h3>Be a responsible citizen! Cast your vote today. 🗳️</h3>
      <button className="cta-button" onClick={() => navigate("/login")}>Vote Now</button>
    </div>
    <br></br>
    
  </div>
)}


        <Outlet />
      </div>

      <div className="footer">Copyright &copy; Vote Karo</div>
    </div>
  );
};

export default HomePage;
