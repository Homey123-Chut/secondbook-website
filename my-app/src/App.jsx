import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav"; // Import Nav component
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import "./index.css"; // Import global CSS

function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <Nav />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        
        
      </Routes>
    </div>
  );
}

export default App;
