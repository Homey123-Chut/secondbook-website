import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      <h2>Hello There, Welcome!</h2>
      <button className="signup-btn google" onClick={handleSignUp}>Sign up with Google</button>
      <button className="signup-btn facebook" onClick={handleSignUp}>Sign up with Facebook</button>
      <button className="signup-btn apple" onClick={handleSignUp}>Sign up with Apple</button>
      <p className="login-text">
        Already have an account? <span className="login-link" onClick={handleSignUp}>Log in</span>
      </p>
    </div>
  );
};

export default SignUp;
