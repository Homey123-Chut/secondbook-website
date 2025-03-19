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

      {/* Google Sign Up */}
      <button className="signup-btn google" onClick={handleSignUp}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
          alt="Google Logo" 
          className="logo-icon"
        />
        Sign up with Google
      </button>

      {/* Facebook Sign Up */}
      <button className="signup-btn facebook" onClick={handleSignUp}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
          alt="Facebook Logo" 
          className="logo-icon"
        />
        Sign up with Facebook
      </button>

      {/* Apple Sign Up */}
      <button className="signup-btn apple" onClick={handleSignUp}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
          alt="Apple Logo" 
          className="logo-icon"
        />
        Sign up with Apple
      </button>

      <p className="login-text">
        Already have an account? <span className="login-link" onClick={handleSignUp}>Log in</span>
      </p>
    </div>
  );
};

export default SignUp;
