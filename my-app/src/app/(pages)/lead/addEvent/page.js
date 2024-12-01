"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Dashboard from "../dashboard/dashboard";
import "./page.css";

import Loader from "../../../animation/Loading";


const page = () => {

    const [eventData, setEventData] = useState({
        event_name: "",
        event_date: "",
        start_time: "12:00",  
        end_time: "13:00",    
        event_venue: "",
        resource_person: "",
        event_inCharge: "",
        event_logo: "",
    });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/lead/addEvent", eventData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });


      if (response.status === 200) {
        
      } else {
        setIsLoading(false);
        toast.error("Failed to update images");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  console.log(eventData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <Dashboard>
        <div className="addEventComponent">
            <div className="addEventComponent-in">
                {/* event_name VARCHAR(255) NOT NULL,
                event_date DATE NOT NULL,
                start_time TIME NOT NULL,
                end_time TIME NOT NULL,
                event_venue VARCHAR(255) NOT NULL,
                upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                resource_person VARCHAR(255) DEFAULT NULL,
                event_incharge VARCHAR(255) DEFAULT NULL, */}

                <div className="addEventComponent-one">
                    <div className="addEventComponent-one-in">
                        <h1>Add event</h1>
                    </div>
                </div>

                <div className="addEventComponent-two">
                    <div className="addEventComponent-two-in">
                        <div className="addEvent-one">
                            <input 
                                type="text"
                                placeholder="Event Name"
                                onChange={handleChange}
                                name="event_name"
                                value={eventData.event_name}
                            />
                        </div>
                        <div className="addEvent-two">
                            <input
                                type="date"
                                placeholder="Event Date"
                                onChange={handleChange}
                                name="event_date"
                                value={eventData.event_date}
                            />
                        </div>
                        <div className="addEvent-three">
                            <input
                                type="time"
                                placeholder="Start Time"
                                onChange={handleChange}
                                name="start_time"
                                value={eventData.start_time}
                            />
                        </div>
                        <div className="addEvent-four">
                            <input
                                type="time"
                                placeholder="End Time"
                                onChange={handleChange}
                                name="end_time"
                                value={eventData.end_time}
                            />
                        </div>
                        <div className="addEvent-five">
                            <input
                                type="text"
                                placeholder="Venue"
                                onChange={handleChange}
                                name="event_venue"
                                value={eventData.event_venue}
                            />
                        </div>
                        <div className="addEvent-six">
                          <input
                            type="text"
                            placeholder="Enter the Resource Person University ID"
                            onChange={handleChange}
                            name="resource_person"
                            value={eventData.resource_person}
                          />
                        </div>
                        <div className="addEvent-seven">
                          <input
                            type="text"
                            placeholder="Enter the Event InCharge University ID"
                            onChange={handleChange}
                            name="event_inCharge"
                            value={eventData.event_inCharge}
                          />
                        </div>
                        <div className="addEvent-eight">
                          <input
                            type="text"
                            placeholder="Enter the Event Logo URL"
                            onChange={handleChange}
                            name="event_logo"
                            value={eventData.event_logo}
                          />
                        </div>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                 
            </div>
        </div>
    </Dashboard>
  );
};

export default page;
