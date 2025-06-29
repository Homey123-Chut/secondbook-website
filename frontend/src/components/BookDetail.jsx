import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/BookDetail.css";
import { fantasyBooks } from "./Book_fantasy";
import { fictionBooks } from "./Fiction";
import { historyBooks } from "./History";
import { sciFiBooks } from "./BookSciFi";
import { Non_fictionBooks } from "./Non_fiction";
import { books } from "./BookList";
import { hardcodedBooks } from "./BookRecentlyAdded";

// Map genres to their respective book arrays
const genres = {
  fantasy: fantasyBooks,
  fiction: fictionBooks,
  history: historyBooks,
  "non-fiction": Non_fictionBooks,
  "science-fiction": sciFiBooks,
  general: books,
  "recently-added": hardcodedBooks,
};

const BookDetail = () => {
  const { genre, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Validate the genre and default to an empty array if invalid
  const booksArr = genres[genre] || [];
  if (!Array.isArray(booksArr)) {
    return <p>Invalid genre!</p>;
  }

  // Find the book by ID from the genre or use the book passed via state
  const book = booksArr.find((book) => book.id === parseInt(id)) || location.state?.book;

  if (!book) {
    return <p>Book not found!</p>;
  }

  // For image carousel: use book.images (array) or fallback to [book.image]
  const image = book.image && book.image.length > 0
    ? book.image
    : [book.image || book.bookImage];

  const [currentImg, setCurrentImg] = useState(0);

  const handlePrevImg = () => {
    setCurrentImg((prev) => (prev === 0 ? image.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setCurrentImg((prev) => (prev === image.length - 1 ? 0 : prev + 1));
  };

  // Handle Buy Now button click
  const handleBuyNow = () => {
    navigate("/payment", { state: { book } });
  };

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    // Implement your add to cart logic here
    alert("Book added to cart!");
  };

  // Handle seller profile click
  const handleSellerClick = () => {
    navigate(`/profile/${book.sellerId || book.seller}`, { state: { seller: book.seller } });
  };

  return (
    <div className="book-detail">
      <div className="book-detail-container book-detail-flex">
        {/* Left: Image carousel */}
        <div className="book-carousel">
          <button className="carousel-arrow left-arrow" onClick={handlePrevImg}>&lt;</button>
          <img
            src={image[currentImg]}
            alt={book.title || book.bookTitle}
            className="book-image"
          />
          <button className="carousel-arrow right-arrow" onClick={handleNextImg}>&gt;</button>
        </div>
        {/* Right: Book info */}
        <div className="book-info">
          <h2 className="book-title">{book.title || book.bookTitle}</h2>
          <h3 className="book-author">By {book.author || "Unknown"}</h3>
          <h3 className="book-genre">{genre || book.genre}</h3>
          <p className="book-price"><strong>Price:</strong> {book.price}</p>
        </div>
      </div>
      <div className="book-extra-container">
        <div className="book-extra">
          <p>
            <strong>Seller Name:</strong>{" "}
            <span className="seller-link" onClick={handleSellerClick}>
              {book.seller || "Not Available"}
            </span>
          </p>
          <p>
            <strong>Telephone 1:</strong> {book.telephone1 || book.telephone || "Not Available"}
          </p>
          <p>
            <strong>Telephone 2:</strong> {book.telephone2 || "Not Available"}
          </p>
          <p>
            <strong>Address:</strong> {book.address || "Not Available"}
          </p>
        </div>
        <div className="description-section">
          <p><strong>Description:</strong> {book.description || "No description available."}</p>
        </div>
      </div>
      <div className="book-detail-btns">
        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="buy-btn" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
