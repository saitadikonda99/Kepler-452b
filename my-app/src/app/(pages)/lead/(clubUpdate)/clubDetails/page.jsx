"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

import Dashboard from "../../dashboard/dashboard";
import "./page.css";

import Loader from "../../../../animation/Loading";

// import icons here
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

const page = () => {
  const [show, setShow] = useState(false);
  const [clubData, setClubData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [updatedData, setUpdatedData] = useState({
    clubId: null,
    clubLogo: "",
    clubName: "",
    clubDescription: "",
    clubAbout: "",
  });

  console.log(updatedData);

  const handleClick = (Id) => {
    console.log(Id);
    return () => {
      setShow(true);
      const data = clubData.find((data) => data.id === Id);

      setUpdatedData({
        clubId: Id,
        clubLogo: data.club_logo,
        clubName: data.club_name,
        clubDescription: data.club_description,
        clubAbout: data.club_about,
      });
    };
  };

  console.log(updatedData);


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
      const response = await axios.post("/api/clubUpdate/clubDetails", updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });


      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Club Details updated successfully!");
        setShow(false);
        setClubData((prevData) =>
          prevData.map((data) =>
            data.id === updatedData.clubId
              ? {
                  ...data,
                  hero_img: updatedData.heroImg,
                  team_img: updatedData.teamImg,
                }
              : data
          )
        );
      } else {
        setIsLoading(false);
        toast.error("Failed to update images");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/clubUpdate/clubDetails");

        console.log(response.data);

        if (response.status === 200) {
          setClubData(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Failed to fetch images");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Internal server error");
      }
    };
    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="clubDetailsComponent">
        <div className="clubDetailsComponent-in">
          <div className="clubDetails-one">
            <div className="clubDetails-one-one">
              <p>
                Instructions to update club details{" "}
                <MdOutlineIntegrationInstructions className="images-icon" />
              </p>
            </div>
            <div className="clubDetails-one-two">
              <div className="clubDetails-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display. 
                </p>
                <Link href="https://www.canva.com/design/DAGVOb7x6hg/H4_YD4-t9s5ZT-iXhWKKjg/view?utm_content=DAGVOb7x6hg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" target="_blank">Canva Link</Link>
              </div>

              <div className="clubDetails-one-two-one">
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
            isLoading ? <Loader /> :
            <div className="clubDetails-two">
              <div className="clubDetails-two-in">
                <div className="clubDetails-two-in-one">
                  <div className="clubDetails-two-in-one-one">
                    <label htmlFor="clubLogo">Club Logo</label>
                    <input
                      type="text"
                      value={updatedData.clubLogo}
                      placeholder="Link of the club logo"
                      id="clubLogo"
                      name="clubLogo"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="clubDetails-two-in-one-two">
                    <label htmlFor="clubName">Club Name</label>
                    <input
                      type="text"
                      value={updatedData.clubName}
                        placeholder="Name of the club"
                      id="clubName"
                      name="clubName"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="clubDetails-two-in-one-three">
                    <label htmlFor="clubDescription">Club Description</label>
                    <input
                      type="text"
                      value={updatedData.clubDescription}
                      placeholder="Description of the club"
                      id="clubDescription"
                      name="clubDescription"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="clubDetails-two-in-one-four">
                    <label htmlFor="clubAbout">Club About</label>
                    <input
                      type="text"
                      value={updatedData.clubAbout}
                      placeholder="About the club"
                      id="clubAbout"
                      name="clubAbout"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                  <div className="clubDetails-two-in-three">
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleSubmit}>Update</button>
                </div>
              </div>
            </div>
          ) : (
            isLoading ? <Loader /> :
            <div className="clubDetails-three">
              {Array.isArray(clubData) &&
                clubData.map((data, index) => {
                  return (
                    <div key={index} className="clubDetails-three-in">
                      <div className="clubDetails-three-in-two">
                        <div className="clubDetails-three-in-two-in">

                          <div className="clubDetails-three-in-two-in-in">
                            <img src={data.club_logo} alt="clubLogo" />
                          </div>
                          <div className="clubDetails-three-in-two-in-name">
                            <p>Club Name: {data.club_name}</p>
                          </div>
                          <div className="clubDetails-three-in-two-in-name">
                          <p>Club Description: {data.club_description}</p>
                            </div>
                          <div className="clubDetails-three-in-two-in-name">
                            <p>Club About: {data.club_about}</p>
                          </div>

                        </div>
                      </div>

                      <div className="clubDetails-three-in-three">
                        <button onClick={handleClick(data.id)}>
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
