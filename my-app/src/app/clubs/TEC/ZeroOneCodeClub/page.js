"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

import "./page.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/page";
import { ClubsArray } from "../../../../data/ZeroOne";

import HeroImg from "../../../Assets/sampleimg.jpg";

// import start here
import { MdLocalActivity } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const page = () => {
  const FaqArray = [
    {
      question: "What is Coding Club?",
      answer:
        "Coding Club is a student organization at the University of Texas at Austin that aims to foster a community of coders and provide resources for students to learn and grow in the field of computer science.",
    },
    {
      question: "How can I join Coding Club?",
      answer:
        "You can join Coding Club by attending our general meetings, which are held every other Wednesday at 6:30 PM in GDC 6.302. You can also join our Slack channel to stay updated on events and opportunities.",
    },
    {
      question: "What programming languages does Coding Club teach?",
      answer:
        "Coding Club teaches a variety of programming languages, including Python, Java, C++, and more. We also offer workshops on web development, data science, and other topics.",
    },
    {
      question: "What events does Coding Club host?",
      answer:
        "Coding Club hosts a variety of events, including workshops, hackathons, and socials. We also collaborate with other student organizations and companies to provide networking opportunities for our members.",
    },
    {
      question: "How can I get involved with Coding Club?",
      answer:
        "You can get involved with Coding Club by attending our events, joining a project team, or becoming an officer. We also welcome suggestions for new events and workshops that you would like to see.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleQues = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [option, setOption] = useState(1);

  const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
  const [currentImageIndex4, setCurrentImageIndex4] = useState(0);

  const images = [HeroImg, HeroImg, HeroImg, HeroImg];

  useEffect(() => {
    if (option === 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex1(
          (prevIndex) => (prevIndex + 1) % images.length
        );
      }, 3000); 
      return () => clearInterval(interval);
    }
  }, [option]);


  useEffect(() => {
    if (option === 4) {
      const interval = setInterval(() => {
        setCurrentImageIndex4(
          (prevIndex) => (prevIndex + 1) % images.length
        );
      }, 3000); 
      return () => clearInterval(interval);
    }
  }, [option]);
  
  const handleQue = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClick = (num) => {
    setOption(num);
  };

  return (
    <div className="ClubPageComponent">
      <div className="ClubPageComponent-in">
        <div className="ClubPageNavbar">
          <Navbar ClubName={ClubsArray[0].clubName} />
        </div>

        <div className="club-hero">
          <div className="club-hero-in">
            <img className="clubpage-hero-in-img" src={HeroImg} alt="image" />

            <div className="club-hero-in-description">
              <h1>ZeroOne Code Club</h1>
              <h3>
                Nice community where the people are nice help to each other to
                code
              </h3>
            </div>
          </div>
        </div>

        <div className="Club-two">
          <div className="Club-two-one">
            <div className="Club-two-one-one">
              <p>What is ZeroOne Code Club</p>
            </div>
            <div className="Club-two-one-two">
              <h1>Accelerate how you build, share, and run applications</h1>
            </div>
            <div className="Club-two-one-three">
              <p>
                ZeroOne helps developers build, share, run, and verify
                applications anywhere — without tedious environment
                configuration or management.
              </p>
            </div>
          </div>
        </div>

        <div className="Club-three">
          <div className="Club-three-one">
            <div className="Club-three-options">
              <div className="C-option-one c-op-cm">
                <div
                  className="C-option-one-in c-op-cm-in"
                  onClick={() => handleClick(1)}
                >
                  <MdLocalActivity className="icon-op" />
                  <p>Glimpse</p>
                </div>
              </div>
              <div className="C-option-two c-op-cm">
                <div
                  className="C-option-two-in c-op-cm-in"
                  onClick={() => handleClick(2)}
                >
                  <MdLocalActivity className="icon-op" />
                  <p>Upcoming Events</p>
                </div>
              </div>
              <div className="C-option-three c-op-cm">
                <div
                  className="C-option-three-in c-op-cm-in"
                  onClick={() => handleClick(3)}
                >
                  <MdLocalActivity className="icon-op" />
                  <p>Activities</p>
                </div>
              </div>
              <div className="C-option-four c-op-cm">
                <div
                  className="C-option-four-in c-op-cm-in"
                  onClick={() => handleClick(4)}
                >
                  <MdLocalActivity className="icon-op" />
                  <p>Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Club-four">
          <div className="Club-four-in">
            <div className="Club-four-one" id={option == 1 ? "" : "hide-club"}>
              <div className="Club-four-one-in">
              <img
                  className="club-slider-image"
                  src={images[currentImageIndex1]}
                  alt="Sliding Image"
                />
              </div>
            </div>

            <div className="Club-four-two" id={option == 2 ? "" : "hide-club"}>
              <div className="Club-four-two-in">
                <div className="Club-four-two-in-one">
                  <div className="Club-four-two-in-one-boxe">
                    <div className="Club-four-two-in-one-boxes">
                      <div className="Club-four-two-in-one-boxes-img">
                        <img
                          className="clubpage-hero-in-img"
                          src={HeroImg}
                          alt="image"
                        />
                      </div>
                      <div className="Club-four-two-in-one-boxes-text">
                        <h1>HTML Bootcamp</h1>
                      </div>
                    </div>

                    <div className="Club-four-two-in-one-boxes">
                      <div className="Club-four-two-in-one-boxes-img">
                        <img
                          className="clubpage-hero-in-img"
                          src={HeroImg}
                          alt="image"
                        />
                      </div>
                      <div className="Club-four-two-in-one-boxes-text">
                        <h1>Nextjs workshop</h1>
                      </div>
                    </div>

                    <div className="Club-four-two-in-one-boxes">
                      <div className="Club-four-two-in-one-boxes-img">
                        <img
                          className="clubpage-hero-in-img"
                          src={HeroImg}
                          alt="image"
                        />
                      </div>
                      <div className="Club-four-two-in-one-boxes-text">
                        <h1>Code for Cause</h1>
                      </div>
                    </div>

                    <div className="Club-four-two-in-one-boxes">
                      <div className="Club-four-two-in-one-boxes-img">
                        <img
                          className="clubpage-hero-in-img"
                          src={HeroImg}
                          alt="image"
                        />
                      </div>
                      <div className="Club-four-two-in-one-boxes-text">
                        <h1>Code Jam</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="Club-four-three"
              id={option == 3 ? "" : "hide-club"}
            >
              <div className="Club-four-three-in">
                <div className="Club-four-three-in-one">
                  <div className="Club-four-three-in-one-boxe">
                    <div className="Club-four-three-in-one-boxes">
                      <div className="Club-four-three-in-one-boxes-img">
                        <img
                          className="clubpage-hero-in-img"
                          src={HeroImg}
                          alt="image"
                        />
                      </div>
                      <div className="Club-four-three-in-one-boxes-text">
                        <h1>Linux Bootcamp</h1>
                      </div>
                    </div>

                    <div className="Club-four-three-in-one-boxes">
                      <div className="Club-four-three-in-one-boxes-img">
                        <img
                          className="clubpage-hero-in-img"
                          src={HeroImg}
                          alt="image"
                        />
                      </div>
                      <div className="Club-four-three-in-one-boxes-text">
                        <h1>React workshop</h1>
                      </div>
                    </div>

                    <div className="Club-four-three-in-one-boxes">
                      <div className="Club-four-three-in-one-boxes-img">
                        <img
                          className="clubpage-hero-in-img"
                          src={HeroImg}
                          alt="image"
                        />
                      </div>
                      <div className="Club-four-three-in-one-boxes-text">
                        <h1>Code for Cause</h1>
                      </div>
                    </div>

                    <div className="Club-four-three-in-one-boxes">
                      <div className="Club-four-three-in-one-boxes-img">
                        <img
                          className="clubpage-hero-in-img"
                          src={HeroImg}
                          alt="image"
                        />
                      </div>
                      <div className="Club-four-three-in-one-boxes-text">
                        <h1>Code Jam</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="Club-four-four" id={option == 4 ? "" : "hide-club"}>
              <div className="Club-four-four-in">
              <img
                  className="club-slider-image"
                  src={images[currentImageIndex4]}
                  alt="Sliding Image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="Club-five">
          <div className="Club-five-in">
            <div className="Club-five-one">
              <p>{ClubsArray[0].clubName}</p>
              <h1>Stats That Matter.</h1>
            </div>
            <div className="Club-five-two">
              <div className="Club-five-two-in">
                <div className="Club-five-two-one cm-club-stats">
                  <h1>300+</h1>
                  <p>Members</p>
                </div>
                <div className="Club-five-two-two cm-club-stats">
                  <h1>100+</h1>
                  <p>Activities</p>
                </div>
                <div className="Club-five-two-three cm-club-stats">
                  <h1>5+</h1>
                  <p>Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------ */}

        <div className="HomeFaq">
          <div className="HomeFaq-in">
            <div className="HomeFaq-in-one">
              <div className="HomeFaq-in-one-one">
                <p>Home / FAQ&apos;s</p>
              </div>
              <div className="HomeFaq-in-one-two">
                <h1>Frequently Asked Questions</h1>
              </div>
            </div>
            <div className="HomeFaq-in-two">
              <div className="HomeFaq-in-two-in">
                <div className="HomeFaq-in-two-one">
                  <div className="HomeFaq-find">
                    <p>Can&apos;t find what you are looking for?</p>
                    <h1>We would like to chat with you.</h1>
                  </div>
                  <div className="HomeFaq-icon">
                    <BiSolidMessageDetail className="msg-icon" />
                  </div>
                </div>
                <div className="HomeFaq-in-two-two">
                  <div className="HomeFaq-in-two-two-in">
                    {FaqArray.map((item, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <div key={index} className="HomeFaq-ques-component">
                          <div
                            onClick={() => handleQues(index)}
                            className="HomeFaq-ques"
                          >
                            <h1>{item?.question}</h1>
                            {isActive ? (
                              <IoMdClose className="icon-close" />
                            ) : (
                              <AiOutlinePlus className="icon" />
                            )}
                          </div>
                          <div
                            className={`HomeFaq-ans ${
                              isActive ? "HomeFaq-ans-show" : "HomeFaq-ans-hide"
                            }`}
                          >
                            <p>{item?.answer}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------ */}
        <div className="ClubPage-six">
          <div className="ClubPage-six-in">
            <div className="ClubPage-six-one">
              <p>Connect</p>
            </div>
            <div className="ClubPage-six-two">
              <h1>Meet the community</h1>
            </div>
            <div className="ClubPage-six-three">
              <p>
                Stop by any of the hundreds of meetups around the world for
                in-person banter or join our Slack and Discourse for virtual
                peer support.
              </p>
            </div>
            <div className="ClubPage-six-four">
              <Link href="/">
                Connect with us <FaArrowRightLong className="connect-icon" />{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="ClubPageFooter">
        <Footer />
      </div>
    </div>
  );
};

export default page;
