import React,{ useState,useEffect } from 'react'
import './App.css'
import './components/style.css'
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import Terms from './pages/Terms';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import HelpSupport from './pages/HelpSupport';
import Dashboard from './pages/Dashboard';
import Vote from './pages/Vote';
import AdminDashboard from './pages/AdminDashboard'
import FAQ from './pages/FAQ';
import Upcoming from './pages/Upcoming';
function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<HomePage user={user} setUser={setUser} />} >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="help" element={<HelpSupport />} />
          <Route path="terms" element={<Terms />} />
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element ={<Dashboard/>}/>
          <Route path="vote" element={<Vote/>}/>
          <Route path="admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="faq" element={<FAQ/>}/>
          <Route path="upcoming" element={<Upcoming/>}/>
        </Route>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
