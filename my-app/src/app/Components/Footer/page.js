"use client";
import React from "react";
import "./page.css";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [translated, setTranslated] = useState(false);

  const handleMouseEnter = () => {
    setTranslated(true);
  };

  const handleMouseLeave = () => {
    setTranslated(false);
  };

  return (
    <div className="footer">
      <div className="footer-in">
        <div className="footer-in-one">
          <div className="footer-in-one-one">
            <Link href="/" className="footer-in-one-one-link">
              Privacy Policy
            </Link>
            <Link href="/" className="footer-in-one-one-link">
              Terms & Conditions
            </Link>
          </div>
          <div className="footer-in-one-two">
            <Link href="/" className="footer-in-one-one-link">
              Help
            </Link>
            <Link href="/" className="footer-in-one-one-link">
              Provide Feedback
            </Link>
            <Link href="/" className="footer-in-one-one-link">
              Report Errors
            </Link>
          </div>
        </div>
        <div className="footer-in-two">
          <div className="footer-in-two-one">
            <h2>The Mission Statement</h2>
            <p>
              The mission of Student Activity Center at esteemed Koneru
              Lakshmaiah Education Foundation is to develop principled,
              innovative leaders who improve the world and to generate ideas
              that advance management practice.
            </p>
            <p
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="translatable-text"
            >
              {translated
                ? "Supporting today's leaders strongly and nurturing tomorrow's leaders"
                : "今日のリーダーを力強く支え、明日のリーダーを育てる"}
            </p>
          </div>
          <div className="footer-in-two-two">
            <div className="footer-in-two-two-one">
              <h2>Official Communication</h2>
              <p>
                K L Deemed to be University, Admin. Office, 29-36-38, Museum
                Road, Governorpet, Vijayawada. A.P., India. Pincode: 520 002.
              </p>
            </div>
            <div className="footer-in-two-two-two">
              <h2>Campus</h2>
              <p>
                K L Deemed to be University, Green Fields, Vaddeswaram, Guntur
                District, A.P., INDIA. Pincode : 522 302.
              </p>
            </div>
          </div>
        </div>
        <div className="footer-in-three">
          <p>
            2023 KLEF - Student Activity Center | Designed & Developed by{" "}
            <Link href="https://www.linkedin.com/in/deepakreddygathpa/">
              Deepak Reddy Gathpa
            </Link>{" "}
            &{" "}
            <Link href="https://www.linkedin.com/in/tadikondasaimanikanta/">
              Tadikonda Sai Manikanta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
