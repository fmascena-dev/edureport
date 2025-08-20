import React from "react";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import SignUpUser from "./pages/SignUpUser.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <SignUpUser />
    </>
  );
};

export default App;
