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
import Loader from "../../../animation/loader";

const page = () => {
  const [show, setShow] = useState(false);
  const [GlimpseData, setGlimpseData] = useState([]);

  console.log(show);

  const [updatedData, setUpdatedData] = useState({
    clubId: null,
    glimpseId: null,
    glimpseImage: "",
    glimpseDesc: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (id) => {
    return () => {
      setShow(true);
      const data = GlimpseData.find((data) => data.id === id);

      setUpdatedData({
        clubId: data.club_id,
        glimpseId: data.id,
        glimpseImage: data.glimpse_image,
        glimpseDesc: data.glimpse_desc,
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
        "/api/clubUpdate/glimpse",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Glimpses updated successfully!");
        setShow(false);
        setGlimpseData((prevData) =>
          prevData.map((data) =>
            data.id === updatedData.glimpseId
              ? {
                  ...data,
                  glimpse_image: updatedData.glimpseImage,
                  glimpse_desc: updatedData.glimpseDesc,
                }
              : data
          )
        );
      } else {
        setIsLoading(false);
        toast.error("Failed to update Glimpses");
      }

      setUpdatedData({
        clubId: null,
        glimpseImage: "",
        glimpseDesc: "",
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
        const response = await axios.get("/api/clubUpdate/glimpse");

        console.log(response.data);

        if (response.status === 200) {
          setGlimpseData(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Failed to fetch Glimpses");
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
      <div className="GlimpseComponent">
        <div className="GlimpseComponent-in">
          <div className="Glimpse-one">
            <div className="Glimpse-one-one">
              <p>
                Instructions to update Glimpse{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="Glimpse-one-two">
              <div className="Glimpse-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display.
                </p>
              </div>

              <div className="Glimpse-one-two-one">
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
                  </Link> For a tutorial on uploading links, please refer to the <Link href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Video_Tutorial.mp4?alt=media&token=a9487ecb-40aa-423a-bf20-26150128b7f5" target="_blank">
                    {" "}
                    Video Tutorial
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>

          {show ? (
            isLoading ? (
              <Loader />
            ) : (
              <div className="Glimpse-two">
                <div className="Glimpse-two-in">
                  <div className="GlimpseUpdate-one">
                    <label For="glimpseImage">Glimpse Image</label>
                    <input
                      type="text"
                      value={updatedData.glimpseImage}
                      placeholder="Link of the hero Glimpse"
                      id="glimpseImage"
                      name="glimpseImage"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="GlimpseUpdate-two">
                    <label For="glimpseDesc">Glimpse Description</label>
                    <input
                      type="text"
                      value={updatedData.glimpseDesc}
                      placeholder="Link of the team Glimpse"
                      id="glimpseDesc"
                      name="glimpseDesc"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="GlimpseUpdate-three">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Update</button>
                  </div>
                </div>
              </div>
            )
          ) : isLoading ? (
            <Loader />
          ) : (
            <div className="Glimpse-three">
              {Array.isArray(GlimpseData) &&
                GlimpseData.map((data, index) => {
                  return (
                    <div key={index} className="Glimpse-three-in">
                      <div className="Glimpse-three-in-one">
                        <img src={data.glimpse_image} alt="heroImg" />
                      </div>
                      <div className="Glimpse-three-in-two">
                        <div className="Glimpse-three-in-two-one">
                          <p>{data.glimpse_desc}</p>
                        </div>
                        <div className="Glimpse-three-in-two-two">
                          <button onClick={handleClick(data.id)}>
                            Update
                          </button>
                        </div>
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
