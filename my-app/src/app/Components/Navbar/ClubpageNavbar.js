"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Link as Scroll } from "react-scroll";
import Link from "next/link";

import "./Navbar.css";

const ClubNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleHover = () => {
    setShowDropdown(true);
  };

  const handleLeave = () => {
    setShowDropdown(false);
  };

  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > window.innerHeight * 0.3) {
        setShowDiv(true);
      } else {
        setShowDiv(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="NavbarComponent">
      <div
        className="NavbarComponent-in"
        id={showDiv ? "show-color" : "show-shadow"}
      >
        <div className="Navbar-one">
          {showDiv ? (
            <h1 onClick={handleScroll}>ZeroOne Code Club</h1>
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/HeroVideo%2FOfficialSacLogo.png?alt=media&token=8a73bd93-832c-4d5d-819d-0e371d12b01c"
              alt=""
            />
          )}
        </div>
        <div className="Navbar-two">
          <ul>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                About
              </Scroll>
            </li>
    
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="team"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                Team
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="activities"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                Activities
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="upcoming"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                Upcoming Events
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="FAQ's"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                FAQs
              </Scroll>
            </li>

            <li>
              <Link href="/sil">SIL</Link>
            </li>

            <li>
              <Link href="https://zeroonelearning.vercel.app/" target="_blank">
                ZeroOneLearning
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClubNavbar;