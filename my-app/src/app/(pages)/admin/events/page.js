"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import "./page.css";

// import components here
import Dashboard from "../dashboard/dashboard";

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
      eventLink: selectedEvent.event_link,
      eventName: selectedEvent.event_name,
      eventDate: selectedEvent.event_date,
      eventVenue: selectedEvent.event_venue,
    });

    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/admin/events", updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Event updated successfully!");
        setShow(false);
        setEventData((prevData) =>
          prevData.map((event) =>
            event.id === updateData.eventId ? { ...event, ...updateData } : event
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update event");
      }
    } catch (error) {
      console.error("Error updating the event:", error);
      toast.error(error.response?.data?.message || "Error updating the event");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/events", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error(error.response?.data?.message || "Failed to fetch events");
      }
    };

    fetchData();
  }, []);

  return (
      <Dashboard>
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
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : Array.isArray(eventData) && eventData.length > 0 ? (
                eventData.map((event) => (
                  <div key={event.id}>
                    <h2>Event Name: {event.event_name}</h2>
                    <img src={event.event_link} alt={event.eventLink} />
                    <p>Date: {event.event_date}</p>
                    <p>Venue: {event.event_venue}</p>
                    <button onClick={() => handleClick(event.id)}>
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <p>No events available.</p>
              )}
            </div>
      </Dashboard>
  );
};

export default Page;
