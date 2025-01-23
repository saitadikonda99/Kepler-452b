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
          src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/2281737997851759787.MP4?alt=media&token=cf3cb996-6d57-4508-a6f1-4c57c92c2cfc"
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