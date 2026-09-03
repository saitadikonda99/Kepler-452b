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
          <h1>Important Notice</h1>
          <p className="about-subtitle">
            A note about this website and its purpose
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-in">
            <h2>About this website</h2>
            <p>
              This is an independent version of the Student Activity Center
              (SAC) website, created to showcase{" "}
              <strong>Sai Tadikonda&apos;s</strong> original work on the
              project. It is not the official SAC website.
            </p>
            <p>
              The content, structure, and features displayed here reflect the
              work done as part of this project and are used for demonstration
              and portfolio purposes only.
            </p>
          </div>
        </div>

        <div className="about-card official">
          <div className="about-card-in">
            <h2>Visit the official website</h2>
            <p>
              To visit the real, official Student Activity Center website of KL
              University, please use the link below.
            </p>
            <a
              className="official-link"
              href="https://sac.kluniversity.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official SAC Website &rarr;
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
