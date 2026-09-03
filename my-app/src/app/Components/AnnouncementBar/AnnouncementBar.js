"use client";
import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./AnnouncementBar.css";

const AnnouncementBar = () => {
  const [dismissed, setDismissed] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY <= window.innerHeight * 0.3);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hidden = dismissed || !atTop;

  useEffect(() => {
    document.body.classList.toggle("announcement-hidden", hidden);
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className="announcement-bar">
      <div className="announcement-bar-in">
        <div className="announcement-info">
          <FaInfoCircle className="announcement-icon" />
          <p className="announcement-text">
            This website is not official. It is purely for demonstrating{" "}
            <span className="announcement-name">Sai Tadikonda&apos;s</span> work.
            Want to visit the official website?{" "}
            <a
              href="https://sac.kluniversity.in"
              target="_blank"
              rel="noopener noreferrer"
              className="announcement-link"
            >
              Check SAC
            </a>
          </p>
        </div>
        <button
          className="announcement-close"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
