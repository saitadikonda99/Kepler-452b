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
  const [ActivitiesData, setActivitiesData] = useState([]);

  const [updatedData, setUpdatedData] = useState({
    clubId: null,
    activityId: null,
    activityName: "",
    activityImage: "",
    activityDate: " ",
    activityVenue: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (id) => {
    return () => {
      setShow(true);
      const data = ActivitiesData.find((data) => data.id === id);

      setUpdatedData({
        clubId: data.club_id,
        activityId: data.id,
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
    setIsLoading(true);
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
        setIsLoading(false);
        toast.success("Upcoming Events activities successfully!");
        setShow(false);
        setActivitiesData((prevData) =>
          prevData.map((data) => {
            if (data.id === updatedData.activityId) {
              return {
                ...data,
                activity_name: updatedData.activityName,
                activity_image: updatedData.activityImage,
                activity_date: updatedData.activityDate,
                activity_venue: updatedData.activityVenue,
              };
            }
            return data;
          })
        );
                    
      
      } else {
        setIsLoading(false);
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
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/clubUpdate/activities");

        console.log(response.data);

        if (response.status === 200) {
          setActivitiesData(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Failed to fetch Activities");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  console.log(ActivitiesData);

  return (
    <Dashboard>
      <div className="ActivitiesComponent">
        <div className="ActivitiesComponent-in">


          <div className="Activities-one">
            <div className="Activities-one-one">
              <p>
                Instructions to update activities{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="Activities-one-two">
              <div className="Activities-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Poster: Use the provided Canva link to resize the poster
                  to the optimal dimensions for website display.
                </p>
              </div>

              <div className="Activities-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Upload and Generate Link: After resizing, download the poster
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
              <div className="Activities-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                To view a tutorial on uploading links, please visit <Link href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Video_Tutorial.mp4?alt=media&token=a9487ecb-40aa-423a-bf20-26150128b7f5" target="_blank">
                    {" "}
                    Video Tutorial
                  </Link>{" "}.
                </p>
              </div>

            </div>
          </div>

          {show ? (
            isLoading ? <Loader /> :
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
                    type="Date"
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
            isLoading ? <Loader /> :
            <div className="Activities-three">
             <div className="Activities-three-in">
              {Array.isArray(ActivitiesData) &&
                ActivitiesData.map((data, index) => {
                  return (
                    <div key={index} className="Activities-three-one">
                      <div className="Activities-three-one-img">
                        <img src={data.activity_image} 
                          alt="heroImg"
                          width={300}
                          height={300}
                           />
                      </div>
                      <div className="Activities-three-one-name" id="ptag">
                        <p>{data.activity_name}</p>
                      </div>
                      <div className="Activities-three-one-date" id="ptag">
                      <p>
                          {new Date(data.activity_date).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="Activities-three-one-venue" id="ptag">
                        <p>{data.activity_venue}</p>
                      </div>
                      <button onClick={handleClick(data.id)}>Update</button>
                    </div>
                  );
                })}
            </div>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
