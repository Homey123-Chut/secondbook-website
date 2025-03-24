import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav"; // Import Nav component
import HomePage from "./components/HomePage"; // Import HomePage component
import SignUp from "./components/SignUp"; // Import SignUp component
import Profile from "./components/Profile"; // Import Profile component
import Footer from "./components/Footer"; // Import Footer component
import SciFiPage from "./components/Sci-Fi-Page"; // Import Sci-Fi Page
import BookList from "./components/BookList"; // Import BookList
import BookDetail from "./components/BookDetail"; // Import BookDetail
import InputInformation from "./components/InputInformation"; // Import InputInformation component
import SellNow from "./components/SellNow"; // Import SellNow component
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
        <Route path="/profile" element={<Profile />} /> {/* Add Profile Route */}
        <Route path="/genres/science-fiction" element={<SciFiPage />} />
        <Route path="/book/:id" element={<BookDetail />} /> {/* Add BookDetail Route */}
        <Route path="/input-info" element={<InputInformation />} /> {/* Add InputInformation Route */}
        <Route path="/sell" element={<SellNow />} /> {/* Add Sell Now Route */}
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
