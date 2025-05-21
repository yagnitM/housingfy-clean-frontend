import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You can modify this based on user state
  
  const handleLogout = () => {
    setIsLoggedIn(false); // Handle logout logic (e.g., clear user data, session)
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/about" className="navbar-link">About</Link>
        </li>
        <li>
          <Link to="/services" className="navbar-link">Services</Link>
        </li>
        <li>
          <Link to="/contact-us" className="navbar-link">Contact Us</Link>
        </li>
        <li>
          <Link to="/guest-dashboard" className="navbar-link">Explore as Guest</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="navbar-link">Logout</button>
            </li>
          </>
        ) : (
          <>
            
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;