"use client"
import React from "react";

import "./page.css";

const page = () => {
  const handleExplore = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero">
      <div className="hero-in">
        <video
          preload="auto"
          autoPlay
          loop
          muted
          style={{ width: "100%" }}
          src={'/hero.mp4'}
        />
        <div className="here-text">
          <h1>Student Activity Center</h1>
          <p className="animate-text">Empowering Tomorrow's Leaders Today</p>
        </div>
        <div className="hero-explore" onClick={handleExplore}>
          <p>Explore SAC</p>
        </div>
      </div>
    </div>
  );
};

export default page;