import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    address: "",
    favoriteGenre: "",
    favoriteBook: "",
    profilePicture: null,
  });
  const [error, setError] = useState("");

  const handleSignUp = (provider) => {
    console.log(`${provider} sign-up clicked`); // Debugging
    setShowForm(true); // Show the input form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfo({ ...userInfo, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    // Validate all fields
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.dateOfBirth ||
      !userInfo.address ||
      !userInfo.favoriteGenre ||
      !userInfo.favoriteBook ||
      !userInfo.profilePicture
    ) {
      setError("All fields are required!");
      return;
    }

    // Save user info to localStorage
    localStorage.setItem("userProfile", JSON.stringify(userInfo));

    // Navigate to profile page
    navigate("/profile");
  };

  return (
    <div className="signup-container">
      <h2>Hello There, Welcome!</h2>

      {/* Google Sign Up */}
      <button className="signup-btn google" onClick={() => handleSignUp("Google")}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google Logo"
          className="logo-icon"
        />
        Sign up with Google
      </button>

      {/* Facebook Sign Up */}
      <button className="signup-btn facebook" onClick={() => handleSignUp("Facebook")}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          alt="Facebook Logo"
          className="logo-icon-facebook"
        />
        Sign up with Facebook
      </button>

      {/* Apple Sign Up */}
      <button className="signup-btn apple" onClick={() => handleSignUp("Apple")}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQesa2rF2WhrA7Sl3iIoznL-gFpA0y0GB-tQ&s"
          alt="Apple Logo"
          className="logo-icon-apple"
        />
        Sign up with Apple
      </button>

      {/* Input Form Modal */}
      {showForm && (
        <div className="signup-form-modal">
          <h3>Enter Your Information</h3>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userInfo.name}
            onChange={handleInputChange}
            className="signup-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={handleInputChange}
            className="signup-input"
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Enter your date of birth"
            value={userInfo.dateOfBirth}
            onChange={handleInputChange}
            className="signup-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={userInfo.address}
            onChange={handleInputChange}
            className="signup-input"
          />
          <input
            type="text"
            name="favoriteGenre"
            placeholder="Enter your favorite book genre"
            value={userInfo.favoriteGenre}
            onChange={handleInputChange}
            className="signup-input"
          />
          <input
            type="text"
            name="favoriteBook"
            placeholder="Enter your favorite book"
            value={userInfo.favoriteBook}
            onChange={handleInputChange}
            className="signup-input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="signup-input"
          />
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      <p className="login-text">
        Already have an account? <span className="login-link" onClick={() => navigate("/")}>Log in</span>
      </p>
    </div>
  );
};

export default SignUp;
