import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [cart, setCart] = useState([]);
  const [booksYouSell, setBooksYouSell] = useState([]);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userProfile")) || {};
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedBooksYouSell = JSON.parse(localStorage.getItem("booksYouSell")) || [];
    setUserInfo(storedUserInfo);
    setCart(storedCart);
    setBooksYouSell(storedBooksYouSell);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromBooksYouSell = (id) => {
    const updatedBooks = booksYouSell.filter((book) => book.id !== id);
    setBooksYouSell(updatedBooks);
    localStorage.setItem("booksYouSell", JSON.stringify(updatedBooks));
  };

  return (
    <div className="profile-container">
      <h2 className="section-title">Profile</h2>
      <div className="profile-info">
        <div className="profile-image">
          <img
            src={userInfo.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
          />
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {userInfo.name || "N/A"}</p>
          <p><strong>Email:</strong> {userInfo.email || "N/A"}</p>
          <p><strong>Date of Birth:</strong> {userInfo.dateOfBirth || "N/A"}</p>
          <p><strong>Address:</strong> {userInfo.address || "N/A"}</p>
          <p><strong>Favorite Book Genre:</strong> {userInfo.favoriteGenre || "N/A"}</p>
          <p><strong>Favorite Book:</strong> {userInfo.favoriteBook || "N/A"}</p>
        </div>
      </div>

      {/* Your Cart Section */}
      <h2 className="section-title">Your Cart</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author || "N/A"}</td>
                  <td>{book.genre || "N/A"}</td>
                  <td>{book.description || "N/A"}</td>
                  <td>{book.price}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(book.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Your cart is empty.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Books You Sell Section */}
      <h2 className="section-title">Books You Sell</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Phone</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booksYouSell.length > 0 ? (
              booksYouSell.map((book) => (
                <tr key={book.id}>
                  <td>{book.bookTitle}</td>
                  <td>{book.genre}</td>
                  <td>{book.price}</td>
                  <td>{book.phone}</td>
                  <td>{book.description}</td>
                  <td>
                    <button onClick={() => handleRemoveFromBooksYouSell(book.id)}>Remove</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No books added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
