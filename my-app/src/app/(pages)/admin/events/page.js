"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import "./page.css";

// import components here
import Dashboard from "../dashboard/dashboard";
import Loader from "../../../animation/Loading";

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

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (eventId) => {
    const selectedEvent = eventData.find((event) => event.id === eventId);

    setUpdateData({
      eventId: selectedEvent.id,
      eventLink: selectedEvent.event_link,
      eventName: selectedEvent.event_name,
      eventDate: new Date(selectedEvent.event_date).toISOString().split("T")[0],
      eventVenue: selectedEvent.event_venue,
    });

    setShow(true);
  };

  console.log(updateData);

  const handleCancel = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/admin/events", updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Event updated successfully!");
        setShow(false);

        setEventData((prevData) =>
          prevData.map((event) =>
            event.id === updateData.eventId
              ? {
                  ...event,
                  event_link: updateData.eventLink,
                  event_name: updateData.eventName, 
                  event_date: updateData.eventDate,
                  event_venue: updateData.eventVenue
                }
              : event
          )
        );

      } else {
        setIsLoading(false);
        toast.error(response.data.message || "Failed to update event");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Error updating the event");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/events", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setEventData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching events:", error);
        toast.error(error.response?.data?.message || "Failed to fetch events");
      }
    };

    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="EventComponent">
        <div className="EventComponent-in">
          <div className="Event-one">
            <div className="Event-one-one">
              <p>
                Instructions to update images{" "}
                <MdOutlineIntegrationInstructions className="Event-icon" />
              </p>
            </div>
            <div className="Event-one-two">
              <div className="Event-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display. 
                </p>
                <Link href="https://www.canva.com/design/DAGVOZTJzh8/Jlj-pRBJ7Qt87h9OdTMTlA/view?utm_content=DAGVOZTJzh8&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" target="_blank">Canva Link</Link>
              </div>

              <div className="Event-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                After resizing the image, download it and upload it to a storage service like 
                  <Link href="http://firebase.google.com/" target="_blank">
                    {" "}
                    Firebase Storage
                  </Link>{" "}
                  or{" "}
                  <Link href="https://www.imghippo.com/" target="_blank">
                    Imghippo.
                  </Link> Please refer to the <Link href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Video_Tutorial.mp4?alt=media&token=a9487ecb-40aa-423a-bf20-26150128b7f5" target="_blank">
                    {" "}
                    Video Tutorial
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>

          {show ? (
            isLoading ? <Loader /> : (
              <div className="Event-two">
                <div className="Event-two-in">
                  <div className="EventUpdate-one">
                    <label htmlFor="eventLink">Event Poster Link</label>
                    <input
                      type="text"
                      placeholder="Event poster Link"
                      name="eventLink"
                      id="eventLink"
                      value={updateData.eventLink}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="EventUpdate-two">
                    <label htmlFor="eventName">Event Name</label>
                    <input
                      type="text"
                      placeholder="Event Name"
                      name="eventName"
                      id="eventName"
                      value={updateData.eventName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="EventUpdate-three">
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                      type="date"
                      placeholder="Event date"
                      name="eventDate"
                      id="eventDate"
                      value={updateData.eventDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="EventUpdate-four">
                    <label htmlFor="eventVenue">Event Venue</label>
                    <input
                      type="text"
                      placeholder="Event Venue"
                      name="eventVenue"
                      id="eventVenue"
                      value={updateData.eventVenue}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="EventUpdate-five">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Update</button>
                  </div>
                </div>
              </div>
            )
          ) : (
            isLoading ? <Loader /> : (
              <div className="Event-three">
                  <div className="Event-three-in">
                {Array.isArray(eventData) && eventData.length > 0 && (
                  eventData.map((event) => (
                    <div className="Event-three-one" key={event.id}>
                      <div className="Event-three-one-img">
                        <img
                          src={event.event_link}
                          alt="Event Image"
                          width={300}
                          height={300}
                        />
                      </div>
                      <div className="Event-three-one-name">
                        <p>{event.event_name}</p>
                      </div>
                      <div className="Event-three-one-date">
                        <p>
                          {new Date(event.event_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="Event-three-one-venue">
                        <p>Venue: {event.event_venue}</p>
                      </div>
                      <button onClick={() => handleClick(event.id)}>Update</button>
                    </div>
                  ))
                )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Page;
