import React from "react";
import Navbar from "./Navbar"; // Import the Navbar component

const Header = () => {
  return (
    <header className="header">
      {/* Only Navbar component */}
      <Navbar />
    </header>
  );
};

export default Header;
