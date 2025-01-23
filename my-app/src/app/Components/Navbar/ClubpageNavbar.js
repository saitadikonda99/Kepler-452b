"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Link as Scroll } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import "./Navbar.css";

const ClubNavbar = ({ setOption, clubName}) => {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleHover = () => {
    setShowDropdown(true);
  };

  const handleClick = () => {
    router.push("/");
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

  const handleIndex = (index) => {
    setOption(index);
  };

  const [isMobile, setIsMobile] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // Toggle navigation for mobile view
  const handleNav = () => {
    setShowNav(!showNav);
  };

  const closeNav = () => {
    setShowNav(false);
  };

  // Detect screen size for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <div className="NavbarComponent">
      <div
        className="NavbarComponent-in"
        id={showDiv ? "show-color" : "show-shadow"}
      >
        <div className="Navbar-one">
          {showDiv ? (
            <h1 onClick={handleScroll}>{clubName}</h1>
          ) : (
            <img
              src="https://i.imghippo.com/files/TmgW3869FDs.png"
              alt=""
              onClick={handleClick}
            />
          )}
          {showNav ? (
            <IoMdClose className="Nav-icon" onClick={handleNav} />
          ) : (
            <FaBars className="Nav-icon" onClick={handleNav} />
          )}
        </div>
        <div className={showNav ? "Navbar-two" : "Navbar-hide"}>
          <ul>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="Club-three"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={() => {
                  handleIndex(1);
                  closeNav();
                }}
              >
                Glimpse
              </Scroll>
            </li>

            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="Club-three"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={() => {
                  handleIndex(2);
                  closeNav();
                }}
              >
                Upcoming Events
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="Club-three"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={() => {
                  handleIndex(3);
                  closeNav();
                }}
              >
                Activities
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="Club-three"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={() => {
                  handleIndex(4);
                  closeNav();
                }}
              >
                Team
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
                onClick={closeNav}
              >
                FAQs
              </Scroll>
            </li>

            <li>
              <Link href="/activities" onClick={closeNav}>
                Activities
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className="NavbarComponent">
      <div
        className="NavbarComponent-in"
        id={showDiv ? "show-color" : "show-shadow"}
      >
        <div className="Navbar-one">
          {showDiv ? (
            <h1 onClick={handleScroll}>{clubName}</h1>
          ) : (
            <img
              src="https://i.imghippo.com/files/TmgW3869FDs.png"
              alt=""
              onClick={handleClick}
            />
          )}
        </div>
        <div className="Navbar-two">
          <ul>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="Club-three"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={() => handleIndex(1)}
              >
                Glimpse
              </Scroll>
            </li>

            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="Club-three"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={() => handleIndex(2)}
              >
                Upcoming Events
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="Club-three"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={() => handleIndex(3)}
              >
                Activities
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="Club-three"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={() => handleIndex(4)}
              >
                Team
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
              <Link href="/activities">Activities</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClubNavbar;
