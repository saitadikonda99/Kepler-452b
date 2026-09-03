import React from "react";
import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="SilNavbar">
      <div className="SilNavbar-in">
        <div className="SilNavbar-one">
          <img
            src="https://i.imghippo.com/files/WquH3553mQ.png"
            alt="Student Activity Center"
          />
        </div>
        <div className="SilNavbar-two">
          <Link href="/">Back to home <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
