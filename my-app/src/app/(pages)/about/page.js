'use client';
import React from 'react';
import './page.css';
import Navbar from './Navbar.js';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-header">
          <h1>About this version.</h1>
          <p className="about-subtitle">
            A preserved record of the work originally developed for SAC.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-in">
            <p className="about-section-label">01 — A note on this website</p>
            <p>
              This is not the official website. This is an independent version
              created to showcase the work I originally developed for SAC.
              After my graduation, the project is now maintained by my juniors,
              and the current official version has been significantly changed.
              This version preserves and demonstrates my original work and
              implementation.
            </p>
          </div>
        </div>

        <div className="about-card official">
          <div className="about-card-in">
            <p>
              For the current official website, please visit SAC.
            </p>
            <a
              className="official-link"
              href="https://sac.kluniversity.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit SAC <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
