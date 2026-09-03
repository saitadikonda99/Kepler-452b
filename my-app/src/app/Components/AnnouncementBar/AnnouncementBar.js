"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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
          <p className="announcement-title">Important Notice</p>
          <p className="announcement-text">
            This is an independent version of SAC, created to showcase Sai
            Tadikonda&apos;s original work on the project. It is not the
            official SAC website.
          </p>
          <Link href="/about" className="announcement-link">
            Read more &rarr;
          </Link>
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
