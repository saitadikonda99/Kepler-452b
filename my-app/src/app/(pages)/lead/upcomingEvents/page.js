"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

import Dashboard from "../dashboard/dashboard";
import "./page.css";

// import icons here
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

// Add to imports at the top
import Loader from "../../../animation/loader";

const page = () => {
  const [show, setShow] = useState(false);
  const [UpcomingEventsData, setUpcomingEventsData] = useState([]);

  const [updatedData, setUpdatedData] = useState({
    clubId: null,
    eventId: null,
    eventName: "",
    eventImage: "",
    eventDate: " ",
    eventVenue: "",
  });

  // Add loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (id) => {
    return () => {
      setShow(true);
      const data = UpcomingEventsData.find((data) => data.id === id);

      setUpdatedData({
        clubId: data.club_id,
        eventId: data.id,
        eventName: data.event_name,
        eventImage: data.event_image,
        eventDate: data.event_date.split("T")[0],
        eventVenue: data.event_venue,
      });
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/clubUpdate/upcomingEvents",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Upcoming Events updated successfully!");
        setShow(false);

        setUpcomingEventsData((prevData) =>
          prevData.map((data) =>
            data.id === updatedData.eventId
              ? {
                  ...data,
                  event_name: updatedData.eventName,
                  event_image: updatedData.eventImage,
                  event_date: updatedData.eventDate,
                  event_venue: updatedData.eventVenue,
                }
              : data
          )
        );
      } else {
        setIsLoading(false);
        toast.error("Failed to update UpcomingEvents");
      }

      setUpdatedData({
        clubId: "",
        eventName: "",
        eventImage: "",
        eventDate: " ",
        eventVenue: "",
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/clubUpdate/upcomingEvents");

        console.log(response.data);

        if (response.status === 200) {
          setUpcomingEventsData(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Failed to fetch UpcomingEvents");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="UpcomingEventsComponent">
        <div className="UpcomingEventsComponent-in">
          <div className="UpcomingEvents-one">
            <div className="UpcomingEvents-one-one">
              <p>
                Instructions to update images{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="UpcomingEvents-one-two">
              <div className="UpcomingEvents-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display.
                </p>
              </div>

              <div className="UpcomingEvents-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Upload and Generate Link: After resizing, download the image
                  and upload it to a storage service like
                  <Link href="http://firebase.google.com/" target="_blank">
                    {" "}
                    Firebase Storage
                  </Link>{" "}
                  or{" "}
                  <Link href="https://www.imghippo.com/" target="_blank">
                    Imghippo
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {show ? (
            isLoading ? <Loader /> :
            <div className="UpcomingEvents-two">
              <div className="UpcomingEvents-two-in">
                <div className="UpcomingEventsUpdate-one">
                  <label For="eventImage">Upcoming Event Image</label>
                  <input
                    type="text"
                    value={updatedData.eventImage}
                    placeholder="Link of the UpcomingEvent Image"
                    id="eventImage"
                    name="eventImage"
                    onChange={handleChange}
                  />
                </div>
                <div className="UpcomingEventsUpdate-two">
                  <label For="eventName">Upcoming Event Name</label>
                  <input
                    type="text"
                    value={updatedData.eventName}
                    placeholder="Event Name"
                    id="eventName"
                    name="eventName"
                    onChange={handleChange}
                  />
                </div>
                <div className="UpcomingEventsUpdate-three">
                  <label For="eventDate">Upcoming Event Date</label>
                  <input
                    type="Date"
                    value={updatedData.eventDate}
                    placeholder="Event Date"
                    id="eventDate"
                    name="eventDate"
                    onChange={handleChange}
                  />
                </div>
                <div className="UpcomingEventsUpdate-four">
                  <label For="eventVenue">Upcoming Event Venue</label>
                  <input
                    type="text"
                    value={updatedData.eventVenue}
                    placeholder="Event venue"
                    id="eventVenue"
                    name="eventVenue"
                    onChange={handleChange}
                  />
                </div>
                <div className="UpcomingEventsUpdate-five">
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleSubmit}>Update</button>
                </div>
              </div>
            </div>
          ) : (
            isLoading ? <Loader /> :
            <div className="UpcomingEvents-three">
              {Array.isArray(UpcomingEventsData) &&
                UpcomingEventsData.map((data, index) => {
                  return (
                    <div key={index} className="UpcomingEvents-three-in">
                      <div className="UpcomingEvents-three-in-img">
                        <img src={data.event_image} alt="heroImg" />
                      </div>
                      <div className="UpcomingEvents-three-in-name" id="ptag">
                        <p>{data.event_name}</p>
                      </div>
                      <div className="UpcomingEvents-three-in-date" id="ptag">
                        <p>
                          {new Date(data.event_date).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="UpcomingEvents-three-in-venue" id="ptag">
                        <p>{data.event_venue}</p>
                      </div>
                      <div className="UpcomingEvents-three-in-button">
                      <button onClick={handleClick(data.id)}>Update</button>
                     </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
