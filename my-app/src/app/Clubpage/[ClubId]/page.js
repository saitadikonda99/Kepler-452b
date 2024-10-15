"use client";
import React from "react";
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import axios from "axios";
import toast from "react-hot-toast";

import { useParams } from 'next/navigation'

import "../page.css";

import ClubNavbar from "../../Components/Navbar/ClubpageNavbar";
import Footer from "../../Components/Footer/page";

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

  const clubId = useParams().ClubId;

  const [clubData, setClubData] = React.useState({});
  const [activities, setActivities] = React.useState([]);
  const [glimpse, setGlimpse] = React.useState([]);
  const [clubImages, setClubImages] = React.useState([]);
  const [socials, setSocials] = React.useState([]);
  const [stats, setStats] = React.useState([]);
  const [upcomingEvents, setUpcomingEvents] = React.useState([]);
  const [clubInfo, setClubInfo] = React.useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/api/clubData/${clubId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          const data = response.data;

          // Separate the data according to the type
          const separatedData = data.reduce((acc, item) => {
            const { type, data } = item;
            acc[type] = data;
            return acc;
          }, {});

          setActivities(separatedData["activities"] || []);
          setClubImages(separatedData["clubImages"] || []);
          setGlimpse(separatedData["glimpse"] || []);
          setSocials(separatedData["socials"] || []);
          setStats(separatedData["stats"] || []);
          setUpcomingEvents(separatedData["upcomingEvents"] || []);
          setClubInfo(separatedData["clubInfo"] || {});
        } else {
          toast.error("Failed to fetch stats");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };

    fetch();
  }, []);

  console.log(activities)

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

  const handleClick = (num) => {
    setOption(num);
  };

  return (
    <div className="ClubPageComponent">
      <div className="ClubPageComponent-in">
        <div className="ClubPageNavbar">
          <ClubNavbar setOption={setOption} />
        </div>

        <div className="club-hero">
          <div className="club-hero-in">
            <img src="" alt="image" />

            <div className="club-hero-in-description">
              <h1>{clubInfo.club_name}</h1>
              <h3>{clubInfo.club_about}</h3>
            </div>
          </div>
        </div>

        <div className="Club-two">
          <div className="Club-two-one" id="about">
            <div className="Club-two-one-one">
              <p>What is {clubInfo.club_name}</p>
            </div>
            <div className="Club-two-one-two">
              <h1>{clubInfo.club_about}</h1>
            </div>
            <div className="Club-two-one-three">
              <p>{clubInfo.club_description}</p>
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
                  id={option == 1 ? "color-option" : ""}
                >
                  <MdLocalActivity className="icon-op" />
                  <p>Glimpse</p>
                </div>
              </div>
              <div className="C-option-two c-op-cm">
                <div
                  className="C-option-two-in c-op-cm-in"
                  onClick={() => handleClick(2)}
                  id={option == 2 ? "color-option" : ""}
                >
                  <MdLocalActivity className="icon-op" />
                  <p>Upcoming Events</p>
                </div>
              </div>
              <div className="C-option-three c-op-cm">
                <div
                  className="C-option-three-in c-op-cm-in"
                  onClick={() => handleClick(3)}
                  id={option == 3 ? "color-option" : ""}
                >
                  <MdLocalActivity className="icon-op" />
                  <p>Activities</p>
                </div>
              </div>
              <div className="C-option-four c-op-cm">
                <div
                  className="C-option-four-in c-op-cm-in"
                  onClick={() => handleClick(4)}
                  id={option == 4 ? "color-option" : ""}
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
                    <img src={glimpse[0]?.glimpse_image} alt="image" />
                  </div>
                  <div className="Club-four-one-in-one-text">
                    <p>{glimpse[0]?.glimpse_desc}</p>
                  </div>
                </div>

                <div className="Club-four-one-in-one">
                  <div className="Club-four-one-in-one-text">
                    <p> {glimpse[1]?.glimpse_desc}</p>
                  </div>
                  <div className="Club-four-one-in-one-img">
                    <img src={glimpse[1]?.glimpse_image} alt="image" />
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="Club-four-two" id={option == 2 ? "" : "hide-club"}>
              <div className="Club-four-two-in">
                <div className="Club-four-two-in-one">
                  {upcomingEvents.map((event) => (
                    <div className="Club-four-two-in-one-card" key={event.id}>
                      <div className="Club-four-two-in-one-card-in">
                        <div className="Club-four-two-in-one-card-in-one">
                          <img src={event.event_image} alt="Event Image" />
                        </div>
                        <div className="Club-four-two-in-one-card-in-two">
                          <h2>{event.event_name}</h2>
                          <p>Date: {event.event_date}</p>
                          <p>Venue: {event.event_venue}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  {activities.map((event, index) => (
                    <div className="Club-four-three-in-one-card" key={index}>
                      <div className="Club-four-three-in-one-card-in">
                        <div className="Club-four-three-in-one-card-in-one">
                          <img
                            src={event.activity_image}
                            alt={event.activity_name}
                          />
                        </div>
                        <div className="Club-four-three-in-one-card-in-two">
                          <h2>{event.activity_name}</h2>
                          <p>Date: {event.activity_date}</p>
                          <p>Venue: {event.activity_venue}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="Club-four-four" id={option == 4 ? "" : "hide-club"}>
              <div className="Club-four-four-in">
                <img
                  className="club-slider-image"
                  src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2Fteam.png?alt=media&token=35deb554-4ed4-4d48-be40-841fce11eb65"
                  alt="Sliding Image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="Club-five">
          <div className="Club-five-in">
            <div className="Club-five-one">
              <p>{clubInfo.club_name}</p>
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
              <FaInstagram
                className="connect-icon"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/zeroonedevs/",
                    "_blank"
                  )
                }
              />
              <FaLinkedin
                className="connect-icon"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/company/zeroonecodeclub/posts/?feedView=all",
                    "_blank"
                  )
                }
              />
              <FaTelegram
                className="connect-icon"
                onClick={() =>
                  window.open("https://t.me/zeroOneCommunity", "_blank")
                }
              />
              <FaTwitter
                className="connect-icon"
                onClick={() =>
                  window.open(
                    "https://x.com/zeroone_codes?t=8AZ3YeUGlFSDyGIYKwQYrw&s=35",
                    "_blank"
                  )
                }
              />
              <FaThreads
                className="connect-icon"
                onClick={() =>
                  window.open(
                    "https://www.threads.net/@zeroonedevs?hl=en",
                    "_blank"
                  )
                }
              />
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
