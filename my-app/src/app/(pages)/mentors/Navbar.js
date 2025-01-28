import React from "react";
import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="mentorsNavbar">
      <div className="mentorsNavbar-in">
        <div className="mentorsNavbar-one">
          <h1>Industry Mentors</h1>
        </div>
        <div className="mentorsNavbar-two">
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 