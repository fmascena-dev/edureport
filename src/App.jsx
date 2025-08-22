import React from "react";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignUpUser from "./pages/SignUpUser.jsx";
import LoginPage from "./pages/LoginPage.jsx"
import SeePublicComplaints from "./pages/SeePublicComplaints.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup-user" element={<SignUpUser />} />
          <Route path="/seepubliccomplaints" element={<SeePublicComplaints />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
