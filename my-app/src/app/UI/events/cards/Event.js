"use client"
import React from "react";

import "./Event.css";

const Event = ({ eventLink, eventName, eventDate, eventVenue }) => {
  return (
    <div className="EventComponent">
      <div className="EventComponent-in">
        <div className="Event-one">
          <img src={eventLink} alt="Event Image" width={300} height={300} />
        </div>
        <div className="Event-two">
          <h2>{eventName}</h2>
          <p>
            {new Date(eventDate).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
          <p>{eventVenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Event;