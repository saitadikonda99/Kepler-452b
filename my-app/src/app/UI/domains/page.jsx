"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

import "./page.css";
// import React from "react";
import { Link as Scroll } from "react-scroll";
// import React from "react";

const page = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
  return (
    <div className="five">
      <div className="five-in">
        <div className="five-in-heading cmn-heading">
          <h1>5 Domains Infinite Possibilities</h1>
          <p>
            Preparing students to make meaningful contributions to society as
            engaged citizens and leaders in a complex world
          </p>
        </div>

        <div className="five-in-one">
          <div className="five-in-one-card">
            <div className="five-in-one-card-in">
              <div className="five-in-one-card-in-one">
                <img
                  src="https://i.imghippo.com/files/TUqr6957Gk.png"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Technology</h2>
                <p>
                Exploring cutting-edge innovations and build exciting projects in coding,
                 robotics, and more with our vibrant tech community.
                </p>

                <ul><li
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
                Explore
              </Scroll>
            </li></ul>
              </div>
            </div>
          </div>

          <div className="five-in-one-card">
            <div className="five-in-one-card-in">
              <div className="five-in-one-card-in-one">
                <img
                  src="https://i.imghippo.com/files/prtV8611dI.png"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Liberal Arts</h2>
                <p>
                Immerse yourself in creativity and expression through engaging 
                discussions on literature, art, and culture in our passionate community.
                </p>

                <ul><li
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
                Explore
              </Scroll>
            </li></ul>
              </div>
            </div>
          </div>

          <div className="five-in-one-card">
            <div className="five-in-one-card-in">
              <div className="five-in-one-card-in-one">
                <img
                  src="https://i.imghippo.com/files/Khsj8104jI.png"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Outreach</h2>
                <p>
                Making a meaningful impact by participating in initiatives that connect and contribute
                 to society through our dynamic programs.
                </p>
                <ul><li
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
                Explore
              </Scroll>
            </li></ul>
              </div>
            </div>
          </div>

          <div className="five-in-one-card">
            <div className="five-in-one-card-in">
              <div className="five-in-one-card-in-one">
                <img
                  src="https://i.imghippo.com/files/wDBg7876h.png"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Entrepreneurship</h2>
                <p>
                Unleashing potentials by exploring ideas, crafting strategies, 
                and collaborating in our thriving entrepreneurship community.
                </p>

                <ul><li
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
                Explore
              </Scroll>
            </li></ul>
              </div>
            </div>
          </div>

          <div className="five-in-one-card">
            <div className="five-in-one-card-in">
              <div className="five-in-one-card-in-one">
                <img
                  src="https://i.imghippo.com/files/qbF3467ljo.png"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Health</h2>
                <p>
                Promoting wellness and innovation through interactive workshops, 
                insightful discussions, and impactful health projects.
                </p>

                <ul><li
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
                Explore
              </Scroll>
            </li></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
