import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "../styles/BookDetail.css";
import { fantasyBooks } from "./Book_fantasy";
import { fictionBooks } from "./Fiction";
import { historyBooks } from "./History";
import { sciFiBooks } from "./BookSciFi";
import { Non_fictionBooks } from "./Non_fiction";
import { books } from "./BookList"; // Import books from BookList.jsx
import { hardcodedBooks } from "./BookRecentlyAdded"; // Correctly import hardcodedBooks

// Map genres to their respective book arrays
const genres = {
  fantasy: fantasyBooks,
  fiction: fictionBooks,
  history: historyBooks,
  "non-fiction": Non_fictionBooks,
  "science-fiction": sciFiBooks,
  general: books, // Map the general genre to the books array
  "recently-added": hardcodedBooks, // Add the recently-added genre
};

const BookDetail = () => {
  const { genre, id } = useParams(); // Get genre and book ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get book details from state

  // Validate the genre and default to an empty array if invalid
  const books = genres[genre] || [];
  if (!Array.isArray(books)) {
    return <p>Invalid genre!</p>; // Display an error message for invalid genres
  }

  // Find the book by ID from the genre or use the book passed via state
  const book = books.find((book) => book.id === parseInt(id)) || location.state?.book;

  if (!book) {
    return <p>Book not found!</p>; // Display a message if the book is not found
  }

  // Handle Buy Now button click
  const handleBuyNow = () => {
    navigate("/payment", { state: { book } }); // Navigate to the payment page with book details
  };

  return (
    <div className="book-detail">
      <div className="book-detail-container">
        <img src={book.image || book.bookImage} alt={book.title || book.bookTitle} className="book-image" />
        <div className="book-info">
          <h2 className="book-title">{book.title || book.bookTitle}</h2>
          <h3 className="book-author">By {book.author || "Unknown"}</h3>
          <h3 className="book-genre">{genre || book.genre}</h3>
          <p className="book-price"><strong>Price:</strong> {book.price}</p>
        </div>
      </div>
      <div className="book-extra-container">
        <div className="book-extra">
          <p><strong>Seller Name:</strong> {book.seller || "Not Available"}</p>
          <p><strong>Telephone:</strong> {book.telephone || "Not Available"}</p>
          <p><strong>Address:</strong> {book.address || "Not Available"}</p>
        </div>
        <div className="description-section">
          <p><strong>Description:</strong> {book.description || "No description available."}</p>
        </div>
      </div>
      <button className="buy-btn" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default BookDetail;
