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

const page = () => {
  const [show, setShow] = useState(false);
  const [ActivitiesData, setActivitiesData] = useState([]);

  const [updatedData, setUpdatedData] = useState({
    clubId: null,
    activityName: "",
    activityImage: "",
    activityDate: " ",
    activityVenue: "",
  });

  const handleClick = (id) => {
    return () => {
      setShow(true);
      const data = ActivitiesData.find((data) => data.id === id);

      setUpdatedData({
        clubId: data.club_id,
        activityName: data.activity_name,
        activityImage: data.activity_image,
        activityDate: data.activity_date.split("T")[0],
        activityVenue: data.activity_venue,
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
    try {
      const response = await axios.post(
        "/api/clubUpdate/activities",
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
        toast.success("Upcoming Events activities successfully!");
        setShow(false);
      } else {
        toast.error("Failed to update Activities");
      }

      setUpdatedData({
        clubId: "",
        activityName: "",
        activityImage: "",
        activityDate: "",
        activityVenue: "",
      });
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/clubUpdate/activities");

        console.log(response.data);

        if (response.status === 200) {
          setActivitiesData(response.data);
        } else {
          toast.error("Failed to fetch Activities");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };
    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="ActivitiesComponent">
        <div className="ActivitiesComponent-in">


          <div className="Activities-one">
            <div className="Activities-one-one">
              <p>
                Instructions to update images{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="Activities-one-two">
              <div className="Activities-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display.
                </p>
              </div>

              <div className="Activities-one-two-one">
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
            <div className="Activities-two">
              <div className="Activities-two-in">
                <div className="ActivitiesUpdate-one">
                  <label For="activityImage">Upcoming activity Image</label>
                  <input
                    type="text"
                    value={updatedData.activityImage}
                    placeholder="Link of the activity Image"
                    id="activity Image"
                    name="activityImage"
                    onChange={handleChange}
                  />
                </div>
                <div className="ActivitiesUpdate-two">
                  <label For="activityName">Upcoming activity Name</label>
                  <input
                    type="text"
                    value={updatedData.activityName}
                    placeholder="activity Name"
                    id="activity Name"
                    name="activityName"
                    onChange={handleChange}
                  />
                </div>
                <div className="ActivitiesUpdate-three">
                  <label For="activityDate">Upcoming activity Date</label>
                  <input
                    type="text"
                    value={updatedData.activityDate}
                    placeholder="activity Date"
                    id="activityDate"
                    name="activityDate"
                    onChange={handleChange}
                  />
                </div>
                <div className="ActivitiesUpdate-four">
                  <label For="activityVenue">Upcoming activity Venue</label>
                  <input
                    type="text"
                    value={updatedData.activityVenue}
                    placeholder="activity venue"
                    id="activityVenue"
                    name="activityVenue"
                    onChange={handleChange}
                  />
                </div>
                <div className="ActivitiesUpdate-five">
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleSubmit}>Update</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="Activities-three">
              {Array.isArray(ActivitiesData) &&
                ActivitiesData.map((data, index) => {
                  return (
                    <div key={index} className="Activities-three-in">
                      <div className="Activities-three-in-img">
                        <img src={data.activity_image} alt="heroImg" />
                      </div>
                      <div className="Activities-three-in-name">
                        <p>{data.activity_name}</p>
                      </div>
                      <div className="Activities-three-in-date">
                        <p>{data.activity_date.split("T")[0]}</p>
                      </div>
                      <div className="Activities-three-in-venue">
                        <p>{data.activity_venue}</p>
                      </div>

                      <button onClick={handleClick(data.id)}>Update</button>
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
