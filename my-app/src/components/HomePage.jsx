import React, { useState } from "react";
import BookList from "./BookList";
import "../styles/HomePage.css";
import BookRecentlyAdded from "./BookRecentlyAdded";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="homepage">
      {/* Animated Gradient Header */}
      <header className="animated-header">
        <h1>
          <span className="highlight">Second Book</span>
        </h1>
        <p className="subtitle">
          Find your next <span className="highlight2">favorite book</span> or
          share one you've already read!
        </p>
      </header>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <button className="search-btn">Search</button>
      </div>

      {/* Banner with Fade-in Animation */}
      <div className="banner fade-in">
        <h2>
          “Second-hand books are not just stories—they are{" "}
          <span className="highlight3">memories</span> passed from one soul to
          another.”
        </h2>
      </div>

      {/* Best Picks Section */}
      <section className="book-section slide-up">
        <h3 className="section-title">🌟 Best Picks</h3>
        <BookList />
        <p className="see-more pulse">see more</p>
      </section>

      {/* Recently Added Section */}
      <section
        className="book-section slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        <h3 className="section-title">🆕 Recently Added</h3>
        <BookRecentlyAdded />
        <p className="see-more pulse">see more</p>
      </section>
    </div>
  );
};

export default HomePage;
