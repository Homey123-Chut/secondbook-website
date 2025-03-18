import React from "react";
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
  { id: 1, title: "Educated", price: "2$", image: educated },
  { id: 2, title: "Harry Potter", price: "2$", image:  outsider},
  { id: 3, title: "The Book of Art", price: "2$", image: meet14 },
  { id: 4, title: "Don't Look Back", price: "2$", image:  theboys},
  { id: 5, title: "all the light we cannot see", price: "2$", image: allthelight},
  { id: 5, title: "all the light we cannot see", price: "2$", image: gameofthrone},
  { id: 5, title: "all the light we cannot see", price: "2$", image: mastery},
  { id: 5, title: "all the light we cannot see", price: "2$", image: spiderman},
];

const BookList = () => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <img src={book.image} alt={book.title} />
          <h4>{book.title}</h4>
          <p>{book.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
