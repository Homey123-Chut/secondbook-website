import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/BookList.css";
import educated from "../assets/educated-cover.jpg";
import outsider from "../assets/outsider cover.jpg";
import meet14 from "../assets/meet14year cover.jpg";
import theboys from "../assets/theboys cover.jpg";
import allthelight from "../assets/all the light we cannot see cover.jpg";
import gameofthrone from "../assets/gameofthrone cover.jpg";
import mastery from "../assets/mastery cover.jpg";
import spiderman from "../assets/spiderman_orig.jpg";

const books = [
  { id: 1, title: "Educated", price: "2$", image: educated, description: "A memoir by Tara Westover." },
  { id: 2, title: "Harry Potter", price: "2$", image: outsider, description: "A fantasy novel by J.K. Rowling." },
  { id: 3, title: "The Book of Art", price: "2$", image: meet14, description: "A guide to art and creativity." },
  { id: 4, title: "Don't Look Back", price: "2$", image: theboys, description: "A thrilling mystery novel." },
  { id: 5, title: "All the Light We Cannot See", price: "2$", image: allthelight, description: "A historical fiction novel by Anthony Doerr." },
  { id: 6, title: "Game of Thrones", price: "2$", image: gameofthrone, description: "A fantasy epic by George R.R. Martin." },
  { id: 7, title: "Mastery", price: "2$", image: mastery, description: "A book on achieving mastery by Robert Greene." },
  { id: 8, title: "Spider-Man", price: "2$", image: spiderman, description: "A comic book about Spider-Man." },
];

const BookList = () => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/${book.id}`}>
            <img src={book.image} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.price}</p>
          </Link>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
