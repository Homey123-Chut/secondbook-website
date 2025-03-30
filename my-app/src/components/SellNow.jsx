import React, { useState } from "react";
import "../styles/SellNow.css";

const SellNow = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    genre: "",
    price: "",
    phone: "",
    description: "",
    bookImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, bookImage: reader.result }); // Save base64 image
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id: Date.now(), // Unique ID for the book
      ...formData,
    };

    // Add the book to "Books You Sell" in Profile
    const booksYouSell = JSON.parse(localStorage.getItem("booksYouSell")) || [];
    booksYouSell.push(newBook);
    localStorage.setItem("booksYouSell", JSON.stringify(booksYouSell));

    // Add the book to "Recently Added Books"
    const recentlyAddedBooks = JSON.parse(localStorage.getItem("recentlyAddedBooks")) || [];
    recentlyAddedBooks.push(newBook);
    localStorage.setItem("recentlyAddedBooks", JSON.stringify(recentlyAddedBooks));

    alert("Book added successfully!");

    // Clear form fields
    setFormData({
      bookTitle: "",
      genre: "",
      price: "",
      phone: "",
      description: "",
      bookImage: "",
    });
  };

  return (
    <div className="sell-now-container">
      <h2>Sell Your Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Book Title:
          <input
            type="text"
            name="bookTitle"
            placeholder="Enter book title"
            value={formData.bookTitle}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            placeholder="Enter genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            placeholder="Enter book description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>
        <label>
          Book Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {formData.bookImage && (
          <img src={formData.bookImage} alt="Book Preview" className="book-preview" />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellNow;