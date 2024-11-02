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

const page = () => {
  const [show, setShow] = useState(false);
  const [SocialsData, setSocialsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
                Instructions to update images{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="Socials-one-two">
              <div className="Socials-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display.
                </p>
              </div>

              <div className="Socials-one-two-one">
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
            isLoading ? <Loader /> : (
              <div className="Socials-two">
                <div className="Socials-two-in">
                  <div className="SocialsUpdate-two">
                    <p>{updatedData.socialName}</p>
                  </div>
                  <div className="SocialsUpdate-three">
                    <label For="socialLink">socialLink</label>
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
                            <p>{data.social_name}</p>
                            <p>{data.social_link}</p>
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
