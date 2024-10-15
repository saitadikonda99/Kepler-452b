"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./page.css";

import Event from "./cards/Event";

const page = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
      const handleEvent = async () => {
        try {
          const response = await axios.get('/api/admin/events');
          setEventData(response.data);
        } catch (error) {
          console.log(error);
        }
          };
          handleEvent();
      }, []);

      console.log(eventData)

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
                  eventLink={event.event_link}
                  eventName={event.event_name}
                  eventDate={event.event_date}
                  eventVenue={event.event_venue}
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
