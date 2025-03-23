import React from "react";
import { useParams } from "react-router-dom";
import "../styles/BookDetail.css";
import educated from "../assets/educated-cover.jpg";
import outsider from "../assets/outsider cover.jpg";
import meet14 from "../assets/meet14year cover.jpg";
import theboys from "../assets/theboys cover.jpg";
import allthelight from "../assets/all the light we cannot see cover.jpg";
import gameofthrone from "../assets/gameofthrone cover.jpg";
import mastery from "../assets/mastery cover.jpg";
import spiderman from "../assets/spiderman_orig.jpg";

const books = [
  { id: 1, title: "Educated", author: "Tara Westover", genre: "Memoir", price: "2$", image: educated, description: "Educated is a 2018 memoir by American author Tara Westover. Westover recounts overcoming her survivalist Mormon family in order to go to college and emphasizes the importance of education in enlarging her world." },
  { id: 2, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy", price: "2$", image: outsider, description: "A fantasy novel by J.K. Rowling." },
  { id: 3, title: "The Book of Art", author: "Unknown", genre: "Art", price: "2$", image: meet14, description: "A guide to art and creativity." },
  { id: 4, title: "Don't Look Back", author: "Unknown", genre: "Mystery", price: "2$", image: theboys, description: "A thrilling mystery novel." },
  { id: 5, title: "All the Light We Cannot See", author: "Anthony Doerr", genre: "Historical Fiction", price: "2$", image: allthelight, description: "A historical fiction novel by Anthony Doerr." },
  { id: 6, title: "Game of Thrones", author: "George R.R. Martin", genre: "Fantasy", price: "2$", image: gameofthrone, description: "A fantasy epic by George R.R. Martin." },
  { id: 7, title: "Mastery", author: "Robert Greene", genre: "Self-Help", price: "2$", image: mastery, description: "A book on achieving mastery by Robert Greene." },
  { id: 8, title: "Spider-Man", author: "Marvel", genre: "Comics", price: "2$", image: spiderman, description: "A comic book about Spider-Man." },
];

const BookDetail = () => {
  const { id } = useParams();
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <p>Book not found!</p>;
  }

  return (
    <div className="book-detail">
      {/* Book Image & Info Section */}
      <div className="book-detail-container">
        <img src={book.image} alt={book.title} />
        <div className="book-info">
          <h2>{book.title}</h2>
          <h3>By {book.author}</h3>
          <h3>{book.genre}</h3>
          <p>{book.price}</p>
          <button className="buy-btn">Buy Now</button>
        </div>
      </div>

      {/* Seller & Description Section */}
      <div className="book-extra">
        <div className="seller-info">
          <p><strong>Tel:</strong> 12345678</p>
          <p><strong>Seller:</strong> Mengheng</p>
          <p><strong>Address:</strong> Kompang Cham</p>
        </div>
        <div className="book-description">
          <p><strong>Description:</strong> {book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
