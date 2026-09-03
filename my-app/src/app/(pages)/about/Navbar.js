import React from "react";
import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="SilNavbar">
      <div className="SilNavbar-in">
        <div className="SilNavbar-one">
          <h1>SAC</h1>
        </div>
        <div className="SilNavbar-two">
          <Link href="/">Back to home <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
