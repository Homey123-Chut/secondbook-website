import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav"; // Import Nav component
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer"; // Import Footer component
import SciFiPage from "./components/Sci-Fi-Page"; // Import Sci-Fi Page
import BookList from "./components/BookList"; // Import BookList
import BookDetail from "./components/BookDetail"; // Import BookDetail
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
        <Route path="/genres/science-fiction" element={<SciFiPage />} />
        <Route path="/book/:id" element={<BookDetail />} /> {/* Add BookDetail Route */}
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
