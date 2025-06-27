import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    profilePicture: null,
    username: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle login input
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // Handle login submit (dummy, replace with real logic)
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginInfo.username || !loginInfo.password) {
      setError("Please enter username and password.");
      return;
    }
    // Dummy: just go to profile
    localStorage.setItem("userProfile", JSON.stringify({ username: loginInfo.username }));
    navigate("/profile");
  };

  // Handle sign up input
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.profilePicture ||
      !userInfo.username ||
      !userInfo.password
    ) {
      setError("All fields are required!");
      return;
    }
    localStorage.setItem("userProfile", JSON.stringify(userInfo));
    navigate("/profile");
  };

  // Swap sides
  const handleSwap = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <div className={`auth-split-container${isSignUp ? " swapped" : ""}`}>
      <div className="auth-side left-side">
        {!isSignUp ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <h2>Log In</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginInfo.username}
              onChange={handleLoginChange}
              className="signup-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={handleLoginChange}
              className="signup-input"
            />
            <button className="submit-btn" type="submit">
              Log In
            </button>
            <p className="swap-text">
              Don't have an account?{" "}
              <span className="swap-link" onClick={handleSwap}>
                Sign up
              </span>
            </p>
          </form>
        ) : (
          <div className="auth-image-side">
            <img src="https://annieandersonstore.com/cdn/shop/files/BookBrushImage3D-Hardcover-Three-Fourths-vxfjtkcsg.png?v=1711383179" alt="Website visual" className="auth-img" />
          </div>
        )}
      </div>
      <div className="auth-side right-side">
        {isSignUp ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userInfo.username}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="signup-input"
            />
            <button className="submit-btn" type="submit">
              Submit
            </button>
            <p className="swap-text">
              Already have an account?{" "}
              <span className="swap-link" onClick={handleSwap}>
                Log in
              </span>
            </p>
          </form>
        ) : (
          <div className="auth-image-side">
            <img src="https://annieandersonstore.com/cdn/shop/files/BookBrushImage3D-Hardcover-Three-Fourths-vxfjtkcsg.png?v=1711383179" alt="Website visual" className="auth-img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
