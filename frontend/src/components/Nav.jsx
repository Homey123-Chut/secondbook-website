// frontend/components/Nav.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../service/userApi";
import "../styles/Nav.css";

const Nav = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [showGenres, setShowGenres] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await fetchCurrentUser();
        const imageUrl = user.profile_photo
          ? `http://localhost:3000/uploads/${user.profile_photo}`
          : "https://via.placeholder.com/40";
        setProfilePicture(imageUrl);
        setIsSignedIn(true);
      } catch {
        setIsSignedIn(false);
        setProfilePicture(null);
      }
    };

    checkAuth();

    window.addEventListener("storage-changed", checkAuth);
    return () => window.removeEventListener("storage-changed", checkAuth);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0"; // Clear cookie
    window.dispatchEvent(new Event("storage-changed"));
    navigate("/");
  };

  return (
    <nav className="navbar animated-navbar">
      <Link to="/" className="logo">
        <span>PSA</span>
        <span className="logo-bold">BOOK</span>
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>

        <div
          className="genres-menu"
          onMouseEnter={() => setShowGenres(true)}
          onMouseLeave={() => setShowGenres(false)}
        >
          <span className="nav-link genres-link">
            Genres <span className="arrow">&#9662;</span>
          </span>
          <div className={`dropdown ${showGenres ? "show" : ""}`}>
            <Link to="/genres/fiction">Fiction</Link>
            <Link to="/genres/non-fiction">Non-Fiction</Link>
            <Link to="/genres/science-fiction">Science Fiction</Link>
            <Link to="/genres/history">History</Link>
            <Link to="/genres/fantasy">Fantasy</Link>
          </div>
        </div>

        <Link to="/sell" className="nav-link sell-now-link rainbow-btn">
          Sell Now
        </Link>

        {isSignedIn ? (
          <div
            className="profile-menu"
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <div className="profile-link-container">
              <Link to="/profile" className="profile-pic-link">
                <img src={profilePicture} alt="Profile" className="profile-pic" />
              </Link>
              <span className="arrow">&#9662;</span>
            </div>
            <div className={`dropdown profile-dropdown ${showProfile ? "show" : ""}`}>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/signup" className="nav-link signup-link rainbow-btn">
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
