"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

import "./page.css";

// import components here
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/page";

const Page = () => {
  const [eventData, setEventData] = useState([]);
  const [show, setShow] = useState(false);

  const [updateData, setUpdateData] = useState({
    eventId: null,
    eventLink: "",
    eventName: "",
    eventDate: "",
    eventVenue: "",
  });

  const handleClick = (eventId) => {
    const selectedEvent = eventData.find((event) => event.id === eventId);

    setUpdateData({
      eventId: selectedEvent.id,
      eventLink: selectedEvent.eventLink,
      eventName: selectedEvent.eventName,
      eventDate: selectedEvent.eventDate,
      eventVenue: selectedEvent.eventVenue,
    });

    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/events", updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status === 200) {
        toast.success("Event updated successfully!");
        setShow(false);
        setEventData((prevData) =>
          prevData.map((event) =>
            event.event_id === updateData.eventId ? { ...event, ...updateData } : event
          )
        );
      } else {
        toast.error("Failed to update event");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating the event");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/events", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setEventData(response.data);
        } else {
          toast.error("Failed to fetch events");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="EventComponent">
      <div className="EventComponent-in">
        <div className="EventComponent-Nav">
          <Navbar />
        </div>
        <div className="EventComponent-one">
          <div className="EventComponent-one-in">
            <div className="EC-sideBar">
              <Sidebar />
            </div>
            <div className="EC-one">
              {show ? (
                <div className="updateForm">
                  <h1>Update Event</h1>
                  <p>Please carefully enter the details</p>
                  <input
                    type="text"
                    placeholder="Event poster Link"
                    name="eventLink"
                    value={updateData.eventLink}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Event Name"
                    name="eventName"
                    value={updateData.eventName}
                    onChange={handleChange}
                  />
                  <input
                    type="date"
                    placeholder="Event date"
                    name="eventDate"
                    value={updateData.eventDate}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Event Venue"
                    name="eventVenue"
                    value={updateData.eventVenue}
                    onChange={handleChange}
                  />
                  <button onClick={handleSubmit}>Update</button>
                </div>
              ) : Array.isArray(eventData) && eventData.length > 0 ? (
                eventData.map((event) => (
                  <div key={event.event_id}>
                    <h2>Event Name: {event.eventName}</h2>
                    <img src={event.eventLink} alt={event.eventLink} />
                    <p>Date: {event.eventDate}</p>
                    <p>Venue: {event.eventVenue}</p>
                    <button onClick={() => handleClick(event.id)}>
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <p>No events available.</p>
              )}
            </div>
          </div>
        </div>
        <div className="EventComponent-Footer">
          <div className="EventComponent-Footer-in">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
