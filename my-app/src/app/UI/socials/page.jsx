"use client"
import React from "react";
import Link from "next/link";
import "./page.css";

import { FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const page = () => {
  return (
    <div className="Eleven">
      <div className="Eleven-in">
        <div className="breadcrumb">
          <span>Home / Socials</span>
        </div>
        <div className="Eleven-in-head cmh-heading">
          <h1>Follow Student Activity Center at KLEF</h1>
        </div>
        <div className="Eleven-one">
          <div className="Eleven-one-in">
            <div className="Social">
              <div className="Social-in">
                <div className="Social-one YT">
                  <FaYoutube />
                </div>
                <div className="Social-two">
                  <h1>YouTube</h1>
                </div>
                <div className="Social-three">
                  <p>
                    Subscribe to join a community of creative developers and
                    learn the latest in Google technology.
                  </p>
                </div>
                <div className="Social-four">
                  <Link href="https://www.youtube.com/@studentactivitycenter_klu">
                    Subscribe
                  </Link>
                </div>
              </div>
            </div>
            <div className="Social">
              <div className="Social-in">
                <div className="Social-one Insta">
                  <RiInstagramFill />
                </div>
                <div className="Social-two">
                  <h1>Instagram</h1>
                </div>
                <div className="Social-three">
                  <p>
                    Subscribe to join a community of creative developers and
                    learn the latest in Google technology.
                  </p>
                </div>
                <div className="Social-four">
                  <Link href="https://www.instagram.com/klu_sac/">Follow</Link>
                </div>
              </div>
            </div>
            <div className="Social">
              <div className="Social-in">
                <div className="Social-one Linked">
                  <FaLinkedin />
                </div>
                <div className="Social-two">
                  <h1>LinkedIn</h1>
                </div>
                <div className="Social-three">
                  <p>
                    Subscribe to join a community of creative developers and
                    learn the latest in Google technology.
                  </p>
                </div>
                <div className="Social-four">
                  <Link href="https://www.linkedin.com/in/klu-sac/">
                    Connect
                  </Link>
                </div>
              </div>
            </div>
            <div className="Social">
              <div className="Social-in">
                <div className="Social-one Twitter">
                  <FaSquareXTwitter />
                </div>
                <div className="Social-two">
                  <h1>Twitter</h1>
                </div>
                <div className="Social-three">
                  <p>
                    Subscribe to join a community of creative developers and
                    learn the latest in Google technology.
                  </p>
                </div>
                <div className="Social-four">
                  <Link href="https://twitter.com/klsac_vja">Follow</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
