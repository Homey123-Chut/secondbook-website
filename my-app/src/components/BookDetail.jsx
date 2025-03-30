import React from "react";
import { useParams } from "react-router-dom";
import "../styles/BookDetail.css";
import { fantasyBooks } from "./Book_fantasy";
import { fictionBooks } from "./Fiction";
import { historyBooks } from "./History";
import { Non_fictionBooks } from "./Non_fiction";
import { sciFiBooks } from "./BookSciFi"; // Import Sci-Fi books

// Map genres to their respective book arrays
const genres = {
  fantasy: fantasyBooks,
  fiction: fictionBooks,
  history: historyBooks,
  "non-fiction": Non_fictionBooks,
  "science-fiction": sciFiBooks, // Add Sci-Fi books
};

const BookDetail = () => {
  const { genre, id } = useParams(); // Get genre and book ID from the URL
  const books = genres[genre]; // Get the books for the specified genre
  const book = books?.find((book) => book.id === parseInt(id)); // Find the book by ID

  if (!book) {
    return <p>Book not found!</p>; // Display a message if the book is not found
  }

  return (
    <div className="book-detail">
      <div className="book-detail-container">
        <img src={book.image} alt={book.title} className="book-image" />
        <div className="book-info">
          <h2 className="book-title">{book.title}</h2>
          <h3 className="book-author">By {book.author || "Unknown"}</h3>
          <h3 className="book-genre">{genre}</h3>
          <p className="book-price">{book.price}</p>
          <p className="book-description">{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
