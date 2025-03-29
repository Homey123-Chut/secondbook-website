import React from "react";
import { Routes, Route } from "react-router-dom";
import InputInformation from "./components/InputInformation"; // Import InputInformation component
import SellNow from "./components/SellNow"; // Import SellNow component
import BookDetail from "./components/BookDetail"; 
import Nav from "./components/Nav"; // Import Nav component
import HomePage from "./components/HomePage"; // Import HomePage component
import SignUp from "./components/SignUp"; // Import SignUp component
import Profile from "./components/Profile"; // Import Profile component
import Footer from "./components/Footer"; // Import Footer component
import SciFiPage from "./components/Sci-Fi-Page"; // Import Sci-Fi Page
import FantasyPage from "./components/Book_fantasyPage"; // Import Fantasy Page
import NonFictionPage from "./components/Non_fictionPage"; // Import Non-fiction Page
import FictionPage from "./components/FictionPage"; // Import Fiction Page
import HistoryPage from "./components/HistoryPage"; // Import History Page
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/genres/science-fiction" element={<SciFiPage />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/input-info" element={<InputInformation />} />
        <Route path="/sell" element={<SellNow />} />
        <Route path="/genres/fantasy" element={<FantasyPage />} />
        <Route path="/genres/non-fiction" element={<NonFictionPage />} />
        <Route path="/genres/fiction" element={<FictionPage />} />
        <Route path="/genres/history" element={<HistoryPage />} />
        
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
