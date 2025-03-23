import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css"; // Ensure the correct CSS path
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

        {/* Genres Dropdown */}
        <div className="genres-menu">
          <Link to="#" className="genres-link">
            Genres
          </Link>
          <div className="dropdown">
            <Link to="/genres/fiction">Fiction</Link>
            <Link to="/genres/non-fiction">Non-Fiction</Link>
            <Link to="/genres/science-fiction">Science Fiction</Link>
            <Link to="/genres/history">History</Link>
            <Link to="/genres/fantasy">Fantasy</Link>
          </div>
        </div>

        <Link to="/sell">Sell Now</Link>
        {isSignedIn ? (
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
