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
  const [imageData, setImageData] = useState([]);

  const [updatedData, setUpdatedData] = useState({
    clubId: null,
    imagesId: null,
    heroImg: "",
    teamImg: "",
  });

  const handleClick = (clubId) => {
    return () => {
      setShow(true);
      const data = imageData.find((data) => data.club_id === clubId);

      setUpdatedData({
        clubId: clubId,
        imagesId: data.id,
        heroImg: data.hero_img,
        teamImg: data.team_img,
      });
    };
  };

  console.log(imageData);

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
      const response = await axios.post("/api/clubUpdate/images", updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Images updated successfully!");
        setShow(false);
        setImageData((prevData) =>
          prevData.map((data) =>
            data.id === updatedData.imagesId
              ? {
                  ...data,
                  hero_img: updatedData.heroImg,
                  team_img: updatedData.teamImg,
                }
              : data
          )
        );
      } else {
        toast.error("Failed to update images");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/clubUpdate/images");

        console.log(response.data);

        if (response.status === 200) {
          setImageData(response.data);
        } else {
          toast.error("Failed to fetch images");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };
    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="ImageComponent">
        <div className="ImageComponent-in">
          <div className="image-one">
            <div className="image-one-one">
              <p>
                Instructions to update images{" "}
                <MdOutlineIntegrationInstructions className="images-icon" />
              </p>
            </div>
            <div className="image-one-two">
              <div className="image-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display.
                </p>
              </div>

              <div className="image-one-two-one">
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
            <div className="image-two">
              <div className="image-two-in">
                <div className="image-two-in-one">
                  <div className="imageUpdate-one">
                    <label For="heroImg">Hero Image</label>
                    <input
                      type="text"
                      value={updatedData.heroImg}
                      placeholder="Link of the hero image"
                      id="heroImg"
                      name="heroImg"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="imageUpdate-two">
                    <label For="teamImg">Team Image</label>
                    <input
                      type="text"
                      value={updatedData.teamImg}
                      placeholder="Link of the team image"
                      id="teamImg"
                      name="teamImg"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="imageUpdate-three">
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleSubmit}>Update</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="Image-three">
              {Array.isArray(imageData) &&
                imageData.map((data, index) => {
                  return (
                    <div key={index} className="image-three-in">
                      <div className="image-three-in-two">
                        <div className="image-three-in-two-in">
                          <div className="image-three-in-two-img">
                            <img src={data.hero_img} alt="heroImg" />
                          </div>
                          <div className="image-three-in-two-img">
                            <img src={data.team_img} alt="teamImg" />
                          </div>
                        </div>
                      </div>

                      <div className="image-three-in-three">
                        <button onClick={handleClick(data.club_id)}>
                          Update
                        </button>
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
