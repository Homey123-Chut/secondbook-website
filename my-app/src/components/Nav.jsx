import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile) {
      setIsSignedIn(true);
      setProfilePicture(userProfile.profilePicture); // Load profile picture
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userProfile");
    setIsSignedIn(false);
    navigate("/"); // Redirect to home page
  };

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

        {/* Sell Now Link */}
        <Link to="/sell" className="sell-now-link">
          Sell Now
        </Link>

        {isSignedIn ? (
          <div className="profile-menu">
            <div className="profile-link">
              <img
                src={profilePicture || "https://via.placeholder.com/40"}
                alt="Profile"
                className="profile-pic"
              />
              <div className="dropdown">
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
