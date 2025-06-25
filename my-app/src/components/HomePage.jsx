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
      {/* Header + Search Bar with image on left */}
      <div className="header-bg-flex">
        <div className="header-image-side">
          <img src= "https://www.biblionepal.com/cdn/shop/files/1683364671.png?v=1683365112&width=1946" alt="Header Visual" className="header-img" />
        </div>
        <div className="header-content-side">
          <header className="animated-header">
            <h1>
              <span className="highlight">Second Book</span>
            </h1>
            <p className="subtitle">
              Find your next <span className="highlight2">favorite book</span> or
              share one you've already read!
            </p>
          </header>
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
        </div>
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
