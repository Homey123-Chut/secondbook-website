import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookRecentlyAdded.css";
import lostManLane from "../assets/lost-man-lane-cover.jpg";
import misery from "../assets/misery-cover.jpg";
import pet from "../assets/pet-sematary-cover.jpg";
import stangerThings from "../assets/stranger-thing-cover.jpg";
import Summer from "../assets/Summer_of_Night_cover.png";

export const hardcodedBooks = [
  { id: 1, title: "Lost Man's Lane", price: "2$", image: lostManLane },
  { id: 2, title: "Misery", price: "2$", image: misery },
  { id: 3, title: "Pet Sematary", price: "2$", image: pet },
  { id: 4, title: "Stranger Things", price: "2$", image: stangerThings },
  { id: 5, title: "Summer of Night", price: "2$", image: Summer },
];

const BookRecentlyAdded = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleAddToCart = (book) => {
    // Check if the book is already in the cart
    if (!cart.some((b) => b.id === book.id)) {
      const updatedCart = [...cart, book];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to "cart" key
      alert(`${book.title} has been added to your cart!`);
    } else {
      alert(`${book.title} is already in your cart.`);
    }
  };

  const isBookInCart = (bookId) => {
    return cart.some((b) => b.id === bookId);
  };

  return (
    <div className="book-recently-added-container">
      <div className="book-recently-added-list">
        {hardcodedBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <Link to={`/book/recently-added/${book.id}`}>
              <img src={book.image} alt={book.title} className="book-image" />
              <h3>{book.title}</h3>
              <p>{book.price}</p>
            </Link>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(book)}
              disabled={isBookInCart(book.id)} // Disable button if already added
            >
              {isBookInCart(book.id) ? "Already Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecentlyAdded;