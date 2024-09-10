import React from "react";
import Link from "next/link";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="SilNavbar">
      <div className="SilNavbar-in">
        <div className="SilNavbar-one">
          <h1>Student Activity Center</h1>
        </div>
        <div className="SilNavbar-two">
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
