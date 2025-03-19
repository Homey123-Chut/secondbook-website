import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";  // ✅ Ensure the correct CSS path

const Nav = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">SECOND<span>BOOK</span></h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/genres">Genres</Link>
        <Link to="/sell">Sell Now</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Nav;
