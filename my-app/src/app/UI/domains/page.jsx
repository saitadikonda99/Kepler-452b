import React from "react";
import Link from "next/link";

import "./page.css";

const page = () => {
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
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F1.png?alt=media&token=3130a20e-b803-45bb-b28d-02c97243555c"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Technology</h2>
                <p>
                  Explore cutting-edge tech trends and hands-on projects, from
                  coding to robotics, in our vibrant tech enthusiast community.
                </p>

                <Link href="/" className="five-in-one-card-in-two-link">
                  Explore
                </Link>
              </div>
            </div>
          </div>

          <div className="five-in-one-card">
            <div className="five-in-one-card-in">
              <div className="five-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F2.png?alt=media&token=6aa75a30-7215-466c-8f5e-2fbc66800ba9"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Liberal Arts</h2>
                <p>
                  Explore cutting-edge tech trends and hands-on projects, from
                  coding to robotics, in our vibrant tech enthusiast community.
                </p>

                <Link href="/" className="five-in-one-card-in-two-link">
                  Explore
                </Link>
              </div>
            </div>
          </div>

          <div className="five-in-one-card">
            <div className="five-in-one-card-in">
              <div className="five-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F3.png?alt=media&token=606f9e07-78e3-4d00-b939-2800d378df32"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Outreach</h2>
                <p>
                  Explore cutting-edge tech trends and hands-on projects, from
                  coding to robotics, in our vibrant tech enthusiast community.
                </p>

                <Link href="/" className="five-in-one-card-in-two-link">
                  Explore
                </Link>
              </div>
            </div>
          </div>

          <div className="five-in-one-card">
            <div className="five-in-one-card-in">
              <div className="five-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F4.png?alt=media&token=8cf75e7e-fad4-47b4-81de-db358f9c57a9"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Entrepreneurship</h2>
                <p>
                  Explore cutting-edge tech trends and hands-on projects, from
                  coding to robotics, in our vibrant tech enthusiast community.
                </p>

                <Link legacyBehavior href="https://www.acickl.in/" className="five-in-one-card-in-two-link">
                  <a target="_blank"> 
                    Explore
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="five-in-one-card">
            <div className="five-in-one-card-in">
              <div className="five-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F5.png?alt=media&token=f357d924-a71d-476a-afc9-eccbd8103034"
                  alt=""
                />
              </div>
              <div className="five-in-one-card-in-two">
                <h2>Health</h2>
                <p>
                  Explore cutting-edge tech trends and hands-on projects, from
                  coding to robotics, in our vibrant tech enthusiast community.
                </p>

                <Link href="/" className="five-in-one-card-in-two-link">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
