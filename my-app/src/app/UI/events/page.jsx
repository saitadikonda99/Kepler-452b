"use client";
import React from "react";
import { useState, useEffect } from "react";
import "./page.css";

import data from "../../../data/data.json";

import Event from "./cards/Event";

const page = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    setEventData(data.eventData);
  }, []);

  // useEffect(() => {
  //     const handleEvent = async () => {
  //       try {
  //         const response = await axios.get('/api/events');
  //         setEventData(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  return (
    <div className="eight">
      <div className="eight-in">
        <div className="breadcrumb">
          <span>Home / Upcoming Events</span>
        </div>
        <div className="eight-in-head">
          <h1>Upcoming Events</h1>
        </div>
        <div className="eight-one">
          <div className="eight-one-in">
            {eventData?.map((event, index) => (
              <div className="eight-event-one Event-cm" key={index}>
                <Event
                  eventLink={event.eventLink}
                  eventName={event.eventName}
                  eventDate={event.eventDate}
                  eventVenue={event.eventVenue}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
