import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css"; // ✅ Ensure the correct CSS path
import profilePic from "../assets/goslinglead (1).webp"; // Import profile picture

const Nav = () => {
  // State to track if the user is signed in
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <nav className="navbar">
      <h1 className="logo">
        SECOND<span>BOOK</span>
      </h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/genres">Genres</Link>
        <Link to="/sell">Sell Now</Link>
        {isSignedIn ? (
          // Display profile picture and dropdown when signed in
          <div className="profile-menu">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <Link to="/logout" onClick={() => setIsSignedIn(false)}>
                Logout
              </Link>
            </div>
          </div>
        ) : (
          // Display "Sign Up" link when not signed in
          <Link to="/signup" className="signup-link">
             Sign Up
            <img src={profilePic} alt="Profile" className="profile-pic" />
           
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
