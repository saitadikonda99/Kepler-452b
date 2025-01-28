"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Link as Scroll } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import "./Navbar.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const router = useRouter();

  console.log(showNav)

  const handleNav = () => {
    setShowNav(!showNav);
  };

  const closeNav = () => {
    setShowNav(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHover = () => {
    setShowDropdown(true);
  };

  const handleLeave = () => {
    setShowDropdown(false);
  };

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

  const handleAboutHover = () => {
    setShowAboutDropdown(true);
  };

  const handleAboutLeave = () => {
    setShowAboutDropdown(false);
  };

  const handleOrganogramClick = () => {
    router.push('/organogram');
    closeNav();
  };

  return isMobile ? (
    <div className="NavbarComponent">
      <div
        className="NavbarComponent-in"
        id={showDiv ? "show-color" : "show-shadow"}
      >
        <div className="Navbar-one">
          {showDiv ? (
            <h1 onClick={handleScroll}>Student Activity Center</h1>
          ) : (
            <img
              src="https://i.imghippo.com/files/TmgW3869FDs.png"
              alt=""
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
            <li
              className="about-hover"
              onMouseEnter={handleAboutHover}
              onMouseLeave={handleAboutLeave}
            >
              <span className="nav-scroll-links">About</span>
              {showAboutDropdown && (
                <div className="about-dropdown">
                  <div onClick={handleOrganogramClick}>Organogram</div>
                  <div>
                    <Scroll
                      to="three"
                      spy={true}
                      smooth={true}
                      offset={-10}
                      duration={400}
                      onClick={closeNav}
                      style={{ width: '100%', display: 'block' }}
                    >
                      Stats
                    </Scroll>
                  </div>
                  <div>
                    <Link href="/mentors" onClick={closeNav}>Mentors</Link>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="five"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={closeNav}
              >
                Domains
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="four"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={closeNav}
              >
                Team
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="seven"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={closeNav}
              >
                News
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="eight"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={closeNav}
              >
                Upcoming Events
              </Scroll>
            </li>
            <li
              className="clubs-hover"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              onClick={closeNav}
            >
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="HomeClubs"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
                onClick={closeNav}
              >
                Clubs
              </Scroll>
            </li>

            <li>
              <Link href="/activities">Activities</Link>
            </li>

            <li>
              <Link href="/clubRegistration">Register</Link>
            </li>

            <li>
              <Link href="https://svr.kluniversity.in" target="_blank">
                SVR
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className="NavbarComponent">
      <div
        className={
          isMobile ? "NavbarComponent-in show-color" : "NavbarComponent-in"
        }
        id={showDiv ? "show-color" : "show-shadow"}
      >
        <div className="Navbar-one">
          {showDiv ? (
            <h1 onClick={handleScroll}>Student Activity Center</h1>
          ) : (
            <img
              src="https://i.imghippo.com/files/TmgW3869FDs.png"
              alt=""
            />
          )}
        </div>

        <div className="Navbar-two">
          <ul>
            <li
              className="about-hover"
              onMouseEnter={handleAboutHover}
              onMouseLeave={handleAboutLeave}
            >
              <span className="nav-scroll-links">About</span>
              {showAboutDropdown && (
                <div className="about-dropdown">
                  <div onClick={handleOrganogramClick}>Organogram</div>
                  <div>
                    <Scroll
                      to="three"
                      spy={true}
                      smooth={true}
                      offset={-10}
                      duration={400}
                      onClick={closeNav}
                      style={{ width: '100%', display: 'block' }}
                    >
                      Stats
                    </Scroll>
                  </div>
                  <div>
                    <Link href="/mentors">Mentors</Link>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="five"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                Domains
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="four"
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
                to="seven"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                News
              </Scroll>
            </li>
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="eight"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                Upcoming Events
              </Scroll>
            </li>
            <li
              className="clubs-hover"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="HomeClubs"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                Clubs
              </Scroll>
            </li>

            <li>
              <Link href="/activities">Activities</Link>
            </li>

            <li>
              <Link href="https://svr.kluniversity.in" target="_blank">
                SVR
              </Link>
            </li>
            <li>
              <Link href="/clubRegistration">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;