import React from "react";
import { Routes, Route } from "react-router-dom";
import InputInformation from "./components/InputInformation"; // Import InputInformation component
import SellNow from "./components/SellNow"; // Import SellNow component
import BookDetail from "./components/BookDetail";
import Nav from "./components/Nav"; // Import Nav component
import HomePage from "./components/HomePage"; // Import HomePage component
import SignUp from "./pages/SignUp"; // Import SignUp component
import Profile from "./pages/Profile"; // Import Profile component
import Footer from "./components/Footer"; // Import Footer component
import BookSciFi from "./components/BookSciFi"; // Import BookSciFi component
import FantasyPage from "./components/Book_fantasyPage"; // Import Fantasy Page
import NonFictionPage from "./components/Non_fictionPage"; // Import Non-fiction Page
import FictionPage from "./components/FictionPage"; // Import Fiction Page
import HistoryPage from "./components/HistoryPage"; // Import History Page
import PaymentPage from "./components/PaymentPage"; // Import PaymentPage component
import "./index.css"; // Import global CSS
import SciFiPage from "./components/Sci-Fi-Page";

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
        <Route path="/genres/science-fiction" element={<SciFiPage />} /> {/* Use BookSciFi for Sci-Fi genre */}
        <Route path="/genres/fantasy" element={<FantasyPage />} />
        <Route path="/genres/non-fiction" element={<NonFictionPage />} />
        <Route path="/genres/fiction" element={<FictionPage />} />
        <Route path="/genres/history" element={<HistoryPage />} />
        <Route path="/book/:genre/:id" element={<BookDetail />} /> {/* Correct route for BookDetail */}
        <Route path="/input-info" element={<InputInformation />} />
        <Route path="/sell" element={<SellNow />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} /> {/* Fallback route */}
      </Routes>

      {/* Footer */}
      <Footer />
    </div> 
  );
}

export default App;
