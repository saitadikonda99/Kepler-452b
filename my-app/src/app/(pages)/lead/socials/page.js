"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Dashboard from "../dashboard/dashboard";
import "./page.css";
import Loader from "../../../animation/loader";

// import icons here
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const page = () => {

  const socialIcons = {
    Facebook: <FaFacebook />,
    Instagram: <FaInstagram />,
    Twitter: <FaTwitter />,
    LinkedIn: <FaLinkedin />,
    YouTube: <FaYoutube />,
  };

  const [show, setShow] = useState(false);
  const [SocialsData, setSocialsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(SocialsData)

  const [updatedData, setUpdatedData] = useState({
    clubId: null,
    socialName: null,
    socialLink: null,
  });

  const handleClick = (clubId, socialName) => {
    return () => {
      setShow(true);
      const data = SocialsData.find((data) => data.social_name === socialName);

      setUpdatedData({
        clubId: clubId,
        socialName: data.social_name,
        socialLink: data.social_link,
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
        "/api/clubUpdate/socials",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Socials updated successfully!");
        setShow(false);
        setSocialsData((prevData) =>
          prevData.map((social) =>
            social.social_name === updatedData.socialName
              ? { ...social, social_link: updatedData.socialLink }
              : social
          )
        );
      } else {
        toast.error("Failed to update Socials");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/clubUpdate/socials");

        if (response.status === 200) {
          setSocialsData(response.data);
        } else {
          toast.error("Failed to fetch Socials");
        }
      } catch (error) {
        toast.error("Internal server error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="SocialsComponent">
        <div className="SocialsComponent-in">
        <div className="Socials-one">
        <div className="Socials-one-one">
              <p>
              Update Your Club's Social Links{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="Socials-one-two">
              <div className="Socials-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                Manage your club’s online presence by providing up-to-date links to your social media platforms.
                </p>
              </div>

              <div className="Socials-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                This information will be visible on the club's profile page.
                </p>
              </div>
            </div>
          </div>

          {show ? (
            isLoading ? <Loader /> : (
              <div className="Socials-two">
                <div className="Socials-two-in">
                  <div className="SocialsUpdate-one">
                    {socialIcons[updatedData.socialName]}
                  </div>
                  <div className="SocialsUpdate-two">
                    <p>{updatedData.socialName}</p>
                  </div>
                  <div className="SocialsUpdate-three">
                    <label For="socialLink">SocialLink</label>
                    <input
                      type="text"
                      value={updatedData.socialLink}
                      placeholder="Link to the social media"
                      id="socialLink"
                      name="socialLink"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="SocialsUpdate-four">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Update</button>
                  </div>
                </div>
              </div>
            )
          ) : (
            isLoading ? <Loader /> : (
              <div className="Socials-three">
                {Array.isArray(SocialsData) &&
                  SocialsData.map((data, index) => {
                    return (
                      <div key={index} className="Socials-three-in">
                        <div classname="Socials-three-in-one" id="final">
                          <div className="Socials-three-in-one-box">
                            <div className="Socials-three-in-one-box icon">
                            {socialIcons[data.social_name]}
                            </div>
                            <div className="Socials-three-in-one-box name">
                            <p>{data.social_name}</p>
                            </div>
                            <div className="Socials-three-in-one-box link">
                            <p>{data.social_link}</p>
                            </div>
                            <div className="Socials-three-in-one-box button">
                            <button
                              onClick={handleClick(
                                data.club_id,
                                data.social_name
                              )}
                            >
                              Update
                            </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
