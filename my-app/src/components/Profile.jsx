import React from "react";
import "../styles/Profile.css";
import profileImage from "../assets/joe.jpg"; // Update with correct image path
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile-container">
      {/* Profile Section */}
      <h2 className="section-title">Profile</h2>
      <div className="profile-info">
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
          <p className="quote">"you're just somebody I used to know"</p>
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> Lon Mengheng</p>
          <p><strong>Date of Birth:</strong> 01.Feb.2004</p>
          <p><strong>Address:</strong> Kompang Cham</p>
          <p><strong>Favorite Book Genre:</strong> Thriller</p>
          <p><strong>Favorite Book:</strong> Dune</p>
        </div>
      </div>

      {/* Your Cart Section */}
      <h2 className="section-title">Your Cart</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Educated</td>
              <td>10-01-25</td>
              <td>1</td>
              <td>2$</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Books You Sell Section */}
      <h2 className="section-title">Book You Sell</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {/* Add dynamic data here if needed */}
          </tbody>
        </table>
      </div>

      {/* Link back to Home */}
      <Link to="/" className="back-home">Go Back</Link>
    </div>
  );
};

export default Profile;
