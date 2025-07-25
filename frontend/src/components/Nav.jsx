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
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem("userProfile"));

      /*
        The backend returns the profile_photo field in one of several formats:
        1. "uploads/filename.jpg" (preferred)
        2. "uploads\\filename.jpg" (Windows back-slashes)
        3. A full absolute URL if the user updated their avatar from a remote source.

        We normalise these variants so that the <img> tag always receives a valid, absolute URL.
      */
      if (user && user.profile_photo) {
        // Replace any back-slashes with forward slashes so that the URL is valid in the browser
        let sanitisedPath = user.profile_photo.replace(/\\\\/g, "/");

        // If the path is not already a URL, prepend the uploads directory when necessary
        if (!sanitisedPath.startsWith("http") && !sanitisedPath.startsWith("uploads/")) {
          sanitisedPath = `uploads/${sanitisedPath}`;
        }

        // Finally, build an absolute URL if we still have a relative path
        const absoluteUrl = sanitisedPath.startsWith("http")
          ? sanitisedPath
          : `http://localhost:3000/${sanitisedPath}`;

        setProfilePicture(absoluteUrl);
        setIsSignedIn(true);
      } else if (user) {
        // Fallback avatar when the user hasn't uploaded one yet
        setProfilePicture("https://via.placeholder.com/40");
        setIsSignedIn(true);
      } else {
        setProfilePicture(null);
        setIsSignedIn(false);
      }
    };
    checkAuth();
    window.addEventListener("storage-changed", checkAuth);
    return () => window.removeEventListener("storage-changed", checkAuth);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0"; // Clear cookie
    localStorage.removeItem("userProfile"); // Remove user profile from localStorage
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
          <div className="profile-menu">
            <Link to="/profile" className="profile-pic-link">
              <img src={profilePicture} alt="Profile" className="profile-picture" />
            </Link>
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
