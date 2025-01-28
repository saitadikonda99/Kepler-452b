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
            {/* First Row */}
            <div className="three-three-in-one count-cm">
              <h2>Actively Engaged Students</h2>
              <CountUp start={0} duration={4} end={15593} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div className="three-three-in-two count-cm">
              <h2>Awards</h2>
              <CountUp start={0} duration={4} end={368} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef}>+</h1>
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div className="three-three-in-three count-cm">
              <h2>Industry Mentors</h2>
              <CountUp start={0} duration={4} end={49} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            {/* Second Row */}
            <div className="three-three-in-one count-cm">
              <h2>Events</h2>
              <CountUp start={0} duration={4} end={404} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef}>+</h1>
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div className="three-three-in-two count-cm">
              <h2>Clubs</h2>
              <CountUp start={0} duration={4} end={88} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef}>+</h1>
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div className="three-three-in-three count-cm">
              <h2>Workshops</h2>
              <CountUp start={0} duration={4} end={104} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h1 ref={countUpRef}>+</h1>
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
