import React, { useEffect, useState } from "react";
import "../styles/BookRecentlyAdded.css";
import lostManLane from "../assets/lost-man-lane-cover.jpg";
import misery from "../assets/misery-cover.jpg";
import pet from "../assets/pet-sematary-cover.jpg";
import stangerThings from "../assets/stranger-thing-cover.jpg";
import Summer from "../assets/Summer_of_Night_cover.png";

const hardcodedBooks = [
  { id: 1, title: "Lost Man's Lane", author: "Tara Westover", genre: "Memoir", price: "2$", image: lostManLane },
  { id: 2, title: "Misery", author: "Stephen King", genre: "Horror", price: "2$", image: misery },
  { id: 3, title: "Pet Sematary", author: "Stephen King", genre: "Horror", price: "2$", image: pet },
  { id: 4, title: "Stranger Things", author: "The Duffer Brothers", genre: "Sci-Fi", price: "2$", image: stangerThings },
  { id: 5, title: "Summer of Night", author: "Dan Simmons", genre: "Horror", price: "2$", image: Summer },
];

const BookRecentlyAdded = () => {
  const [recentlyAddedBooks, setRecentlyAddedBooks] = useState([]);

  useEffect(() => {
    // Fetch books from localStorage
    const storedRecentlyAddedBooks = JSON.parse(localStorage.getItem("recentlyAddedBooks")) || [];
    setRecentlyAddedBooks(storedRecentlyAddedBooks);
  }, []);

  return (
    <div className="book-recently-added-container">
      <h2>Recently Added Books</h2>
      <div className="book-recently-added-list">
        {/* Display hardcoded books */}
        {hardcodedBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.image} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.price}</p>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}

        {/* Display books added via "Sell Now" */}
        {recentlyAddedBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.bookImage} alt={book.bookTitle} className="book-image" />
            <h3>{book.bookTitle}</h3>
            <p>{book.genre}</p>
            <p>{book.price}</p>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecentlyAdded;