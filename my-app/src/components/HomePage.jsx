import React, { useState } from "react";
import BookList from "./BookList";
import "../styles/HomePage.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log("Search Term:", e.target.value); // You can replace this with actual search logic
  };

  return (
    <div className="homepage">
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

      {/* Other Homepage Content */}
      <h1>Welcome to Second Book</h1>
      <p>Find your next favorite book or share one you've already read!</p>

      <div className="banner">
        <h2>
          “Second-hand books are not just stories—they are memories passed from one soul to another.”
        </h2>
      </div>

      <section className="book-section">
        <h3>Best Picks</h3>
        <BookList />
        <p className="see-more">see more</p>
      </section>

      <section className="book-section">
        <h3>Recently added</h3>
        <BookList />
        <p className="see-more">see more</p>
      </section>
    </div>
  );
};

export default HomePage;
