"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";


import "./page.css";

import ClubNavbar from "../../../Components/Navbar/ClubpageNavbar";
import Footer from "../../../Components/Footer/page";
import { ClubsArray } from "../../../../data/ZeroOne";

import HeroImg from "../../../Assets/hersectionimg.jpg";

// import start here
import { MdLocalActivity } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const page = () => {
  const FaqArray = [
    {
      question: "What is ZeroOne Code Club?",
      answer:
        "The ZeroOne Code CLub is a student organization at the KL University at Vaddeswaram that aims to foster a community of coders and provide resources for students to learn and grow in the field of computer science.",
    },
    {
      question: "How can I join ZeroOne Code Club?",
      answer:
        "You can join ZeroOne Code Club by attending our general meetings, collaborating with us in doing projects, workshops, etc which will take place every month. You can also join our telegram community to stay updated on events and opportunities.",
    },
    {
      question: "What programming languages does ZeroOne Code Club teach?",
      answer:
        "ZeroOne COde CLub teaches a variety of programming languages, including Python, Java, C++, and more. We also offer workshops on web development, linux system administration, data science, and other topics.",
    },
    {
      question: "What events does ZeroOne Code Club host?",
      answer:
        "ZeroOne Code Club hosts a variety of events, including workshops, hackathons, and socials. We also collaborate with other student organizations and companies to provide networking opportunities for our members.",
    },
    {
      question: "How can I get involved with ZeroOne Code CLub?",
      answer:
        "You can get involved with ZeroOne Code Club by attending our events, joining a project team, or becoming an official member. We also welcome suggestions for new events and workshops that you would like to see.",
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
        setCurrentImageIndex1((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [option]);

  useEffect(() => {
    if (option === 4) {
      const interval = setInterval(() => {
        setCurrentImageIndex4((prevIndex) => (prevIndex + 1) % images.length);
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
          <ClubNavbar ClubName={ClubsArray[0].clubName} />
        </div>

        <div className="club-hero">
          <div className="club-hero-in">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubs%2FZeroOneHero.jpg?alt=media&token=a765b8fc-b356-4ebb-98e2-1574f693d6ab"
              alt="image"
            />

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
          <div className="Club-two-one" id="about">
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
            {/* glimpse */}
            <div className="Club-four-one" id={option == 1 ? "" : "hide-club"}>
              <div className="Club-four-one-in">
                <div className="Club-four-one-in-one">
                  <div className="Club-four-one-in-one-img">
                  <img
              src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2FIMG_6316.jpeg?alt=media&token=0d3a1156-f1e8-4c99-afa0-bdb723c41f20"
              alt="image"
            />
                  </div>
                  <div className="Club-four-one-in-one-text">
                  <p>
                  The session on interacting and teaching international students offered a unique opportunity to
                  exchange knowledge and cultural insights with learners from around the globe. Participants gained 
                  valuable skills in cross-cultural communication and collaborative learning, enriching the global educational experience.
                  </p>
                  </div>
                </div>
                
                <div className="Club-four-one-in-one">
                <div className="Club-four-one-in-one-text">
                  <p>The walk-in interviews held at SAC for ZeroOne Code Club recruitment attracted a large number of enthusiastic 
                    candidates eager to join the club. Applicants showcased their technical skills and passion for coding in direct
                    interactions with club members. The event successfully identified talented individuals to contribute to the club's growth.
                  </p>
                  </div>
                  <div className="Club-four-one-in-one-img">
                  <img
              src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2Fphoto_2024-04-15%2018.44.58.jpeg?alt=media&token=22e86fb7-cfe0-4e9d-af14-48629c6e31f7"
              alt="image"
            />
                  </div>
                </div>

              </div>
            </div>

            {/* Upcoming Events */}
            <div className="Club-four-two" id={option == 2 ? "" : "hide-club"}>
              <div className="Club-four-two-in">
              <div className="Club-four-two-in-one">
          <div className="Club-four-two-in-one-card">
            <div className="Club-four-two-in-one-card-in">
              <div className="Club-four-two-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2FLadder0.2.png?alt=media&token=6ccca9e2-638a-450b-bbb9-ba74e269cf62"
                  alt="img"
                />
              </div>
              <div className="Club-four-two-in-one-card-in-two">
                <h2>Coding Ladder0.2</h2>
                <p>Date: 08-10-2024</p>
                <p>Venue: R301A</p>
              </div>
            </div>
          </div>

          <div className="Club-four-two-in-one-card">
            <div className="Club-four-two-in-one-card-in">
              <div className="Club-four-two-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2FWebDev%20%20Day3.png?alt=media&token=6b54cf11-53e9-485d-afcb-4def2f89c478"
                  alt="img"
                />
              </div>
              <div className="Club-four-two-in-one-card-in-two">
                <h2>C-Lang Workshop</h2>
                <p>Date: 23-10-2024</p>
                <p>Venue: R301B</p>
              </div>
            </div>
          </div>

          <div className="Club-four-two-in-one-card">
            <div className="Club-four-two-in-one-card-in">
              <div className="Club-four-two-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2FCodeforCauseV3.0Poster%20.png?alt=media&token=bae294cd-9fe4-4891-9714-a57188c6d1a4"
                  alt="img"
                />
              </div>
              <div className="Club-four-two-in-one-card-in-two">
                <h2>Code For Cause V2.O</h2>
                <p>Date: 28-12-2004</p>
                <p>Venue: R&D</p>
              </div>
            </div>
          </div>

          <div className="Club-four-two-in-one-card">
            <div className="Club-four-two-in-one-card-in">
              <div className="Club-four-two-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2FWebDev%20%20Day3%20(1).png?alt=media&token=dc10daf3-e997-4ddd-9056-9b00cb3d3043"
                  alt="img"
                />
              </div>
              <div className="Club-four-two-in-one-card-in-two">
                <h2>Web Dev Workshop</h2>
                <p>Date: 08-11-2024</p>
                <p>Venue: R301A</p>
              </div>
            </div>
          </div>

        </div>
              </div>
            </div>


            {/* activities */}
            <div
              className="Club-four-three"
              id={option == 3 ? "" : "hide-club"}
            >
              <div className="Club-four-three-in">
                
              <div className="Club-four-three-in-one">
          <div className="Club-four-three-in-one-card">
            <div className="Club-four-three-in-one-card-in">
              <div className="Club-four-three-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2Fphoto_2024-04-15%2018.44.51.jpeg?alt=media&token=297356aa-4b62-42e8-b517-8ba08da25550"
                  alt="img"
                />
              </div>
              <div className="Club-four-three-in-one-card-in-two">
                <h2>React Workshop</h2>
                <p>Date: 12-10-2023</p>
                <p>Venue: R101A</p>
              </div>
            </div>
          </div>

          <div className="Club-four-three-in-one-card">
            <div className="Club-four-three-in-one-card-in">
              <div className="Club-four-three-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2Fphoto_2024-04-15%2018.40.17.jpeg?alt=media&token=9fcd238c-d0fc-4027-9ada-aff8f193c840"
                  alt="img"
                />
              </div>
              <div className="Club-four-three-in-one-card-in-two">
                <h2>Linux Bootcamp</h2>
                <p>Date: 25-03-2024</p>
                <p>Venue: R&D Theatre</p>
              </div>
            </div>
          </div>

          <div className="Club-four-three-in-one-card">
            <div className="Club-four-three-in-one-card-in">
              <div className="Club-four-three-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2Fcfc2023.png?alt=media&token=43de02df-9781-49a6-b631-8eb095802699"
                  alt="img"
                />
              </div>
              <div className="Club-four-three-in-one-card-in-two">
                <h2>Code For Cause</h2>
                <p>Date: 18-10-2023</p>
                <p>Venue: SAC Hall</p>
              </div>
            </div>
          </div>

          <div className="Club-four-three-in-one-card">
            <div className="Club-four-three-in-one-card-in">
              <div className="Club-four-three-in-one-card-in-one">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2FDSC_0385.JPG?alt=media&token=0b5db07d-e087-4807-8fa8-814d63c5dc32"
                  alt="img"
                />
              </div>
              <div className="Club-four-three-in-one-card-in-two">
                <h2>Code Jam</h2>
                <p>Date: 16-02-2024</p>
                <p>Venue: R005A</p>
              </div>
            </div>
          </div>

        </div>


              </div>
            </div>

            {/* Team */}
            <div className="Club-four-four" id={option == 4 ? "" : "hide-club"}>
              <div className="Club-four-four-in">
                <img className="club-slider-image" src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2Fteam.png?alt=media&token=35deb554-4ed4-4d48-be40-841fce11eb65" alt="Sliding Image" />
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
                  <CountUp start={0} duration={4} end={300} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
                  <p>Members</p>
                </div>
                <div className="Club-five-two-two cm-club-stats">
                  <CountUp start={1} duration={4} end={100} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
                  <p>Activities</p>
                </div>
                <div className="Club-five-two-three cm-club-stats">
                  <CountUp start={1} duration={4} end={11} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
                  <p>Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------ */}

        <div className="HomeFaq" id="FAQ's">
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
                    <h1>We are available to assist you via chat.</h1>
                  </div>
                  <div className="HomeFaq-icon">
                    <a
                      href="https://t.me/zeroOneCommunity"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BiSolidMessageDetail className="msg-icon" />
                    </a>
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
              <h1>Join the community</h1>
            </div>
            <div className="ClubPage-six-three">
              <p>
                Join our on-campus meetups for in-person networking with fellow
                coders, or engage with us for collaborative discussions and
                technical support within our university coding community.
              </p>
            </div>
            <div className="ClubPage-six-four">
                <FaInstagram className="connect-icon" onClick={() => window.open('https://www.instagram.com/zeroonedevs/', '_blank')}/>
                <FaLinkedin className="connect-icon" onClick={() => window.open('https://www.linkedin.com/company/zeroonecodeclub/posts/?feedView=all', '_blank')} />
                <FaTelegram className="connect-icon" onClick={() => window.open('https://t.me/zeroOneCommunity', '_blank')}/>
                <FaTwitter className="connect-icon" onClick={() => window.open('https://x.com/zeroone_codes?t=8AZ3YeUGlFSDyGIYKwQYrw&s=35', '_blank')}/>
                <FaThreads className="connect-icon" onClick={() => window.open('https://www.threads.net/@zeroonedevs?hl=en', '_blank')}/>

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
