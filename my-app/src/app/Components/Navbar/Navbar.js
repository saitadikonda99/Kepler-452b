"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Link as Scroll } from "react-scroll";
import Link from "next/link";

import "./Navbar.css";

const Navbar = () => {
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
            <h1 onClick={handleScroll}>Student Activity Center</h1>
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
                to="three"
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
            <li>
              <Scroll
                className="nav-scroll-links"
                activeClass="active"
                to="Twelve"
                spy={true}
                smooth={true}
                offset={-10}
                duration={400}
              >
                FAQs
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

              {/* <div className="clubs-dropdown">
                <div className="thirteen clubs-list">
                  <div className="thirteen-in">
                    <div className="breadcrumb">
                      <span>Home / Clubs</span>
                    </div>

                    <div className="cmn-heading">
                      <h1>Explore Various Categories of Clubs</h1>
                    </div>

                    <div className="thirteen-in-one">
                      <div className="thirteen-box">
                        <div className="thirteen-box-in">
                          <h2>TEC</h2>
                          <div className="thirteen-box-in-desc">
                            <p>Central Technology Clubs under SAC</p>
                          </div>
                          <div className="thirteen-box-in-one">
                            <div className="thirteen-box-in-one-in">
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Aero Electric Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Agriculture Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Cryptography Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Cyber Security Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Design Sphere Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Luminary Digital Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Mobile E-Sports Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Prompt-o-Ventures
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Respawn (Game Development)
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Review Tech Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                WebApps Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Zero One Code Club
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="thirteen-box">
                        <div className="thirteen-box-in">
                          <h2>LCH</h2>
                          <div className="thirteen-box-in-desc">
                            <p>Liberal Arts, Creative Arts and Hobby Clubs</p>
                          </div>

                          <div className="thirteen-box-in-one">
                            <div className="thirteen-box-in-one-in">
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Adventure Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Arts Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Dance Club (Fusion)
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Dance Club (NARTHANA)
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Dramatics Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                F.E.K (FASHION DESIGNING)
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Film Technology Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Handicrafts Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                KL Talks Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Literature Club (VACHAS)
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Music Club (Swara)
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Script Writing Club (Versatales)
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Social Media Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Standup Comedy
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="thirteen-box">
                        <div className="thirteen-box-in">
                          <h2>ESO</h2>
                          <div className="thirteen-box-in-desc">
                            <p>Extension & Society Outreach Clubs</p>
                          </div>

                          <div className="thirteen-box-in-one">
                            <div className="thirteen-box-in-one-in">
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                CEA
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Electoral Literacy Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                KL SAC - Empower
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                KL-Radio Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Kutumb Society
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Ohana
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Smart Village Revolution
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Yuva Tourism Club
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="thirteen-box">
                        <div className="thirteen-box-in">
                          <h2>IIE</h2>
                          <div className="thirteen-box-in-desc">
                            <p>
                              Innovation, Incubation and Entrepreneurship Clubs
                            </p>
                          </div>

                          <div className="thirteen-box-in-one">
                            <div className="thirteen-box-in-one-in">
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                KL ACIC
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                KL TBI
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="thirteen-box">
                        <div className="thirteen-box-in">
                          <h2>HWB</h2>
                          <div className="thirteen-box-in-desc">
                            <p>Health and Wellbeing Clubs</p>
                          </div>

                          <div className="thirteen-box-in-one">
                            <div className="thirteen-box-in-one-in">
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Safe Life Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Spiritual Science Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                Yoga Club
                              </Link>
                              <Link
                                href="/"
                                className="thirteen-box-in-one-in-link"
                              >
                                YRC
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </li>

            <li>
              <Link href="/sil">SIL</Link>
            </li>

            <li>
              <Link href="https://sac-svr.vercel.app" target="_blank">
                SVR
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
