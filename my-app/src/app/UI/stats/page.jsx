"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

import "./page.css";

const Page = () => {

  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get("/api/overAllStats");
      setStats(response.data[0]);
    };
    fetchStats();
  }, []);

  console.log(stats);

  return (
    <div className="three">
      <div className="three-in">
        <div className="three-one">
          <div className="three-one-in">
            <h1>A Department without Boundaries</h1>
          </div>
        </div>
        <div className="three-two">
          <div className="three-two-in">
            <p>
              Designed to accommodate path-breaking ideas, problem-solving
              postulates, and artistic assertions, creating an environment that
              encourages innovation and experimentation
            </p>
          </div>
        </div>
        <div className="three-three">
          <div className="three-three-one">
            <div className="three-three-in-one count-cm">
              <h2>Collaborations</h2>
              <CountUp start={0} duration={4} end={100} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div className="three-three-in-two count-cm">
              <h2>Clubs</h2>
              <CountUp start={0} duration={4} end={stats.total_clubs} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div className="three-three-in-three count-cm">
              <h2>Industry Mentors</h2>
              <CountUp start={1} duration={4} end={50} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div className="three-three-in-one count-cm">
              <h2>Actively Engaged Students</h2>
              <CountUp start={1} duration={4} end={6000} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div className="three-three-in-two count-cm">
              <h2>Events</h2>
              <CountUp start={1} duration={4} end={534} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div className="three-three-in-three count-cm">
              <h2>Activities</h2>
              <CountUp start={1} duration={4} end={stats.total_activities} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
