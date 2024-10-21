"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import "./page.css";

// import components here
import Dashboard from "../dashboard/dashboard";

const Page = () => {
  const [clubData, setClubData] = useState({
    leadUsername: "",
    leadPassword: "",
    leadConfirmPassword: "",
    leadName: "",
    leadEmail: "",
    clubDomain: "",
    clubName: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/admin/addClub", clubData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response);

      if (response.status === 200) {
        toast.success("Club added successfully");
      } else {
        toast.error("Something went wrong");
      }

      setClubData({
        leadUsername: "",
        leadPassword: "",
        leadConfirmPassword: "",
        leadName: "",
        leadEmail: "",
        clubDomain: "",
        clubName: "",
      });
    } catch (error) {
      if (error?.response) {
        switch (error.response.status) {
          case 400:
            toast.error("passwords do not match");
            break;
          case 401:
            toast.error("All fields are required");
            break;
          case 409:
            toast.error(error.response.data.message || "User already exists");
            break;
          case 500:
            toast.error("Server error, please try again later");
            break;
          default:
            toast.error(error.response.data.message || "Something went wrong");
        }
      } else {
        toast.error("Network error, please check your connection");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData({
      ...clubData,
      [name]: value,
    });
  };

  return (
    <Dashboard>
      <div className="AddClub">
        <div className="AddClubComponent">
          <div className="AddClubComponent-one">
            <h1>AddClub</h1>
          </div>
          <div className="AddClubComponent-two">
            <div className="AddClubComponent-two-in">
              <div className="AddClubComponent-two-in-one">
                <h3>Club Lead Details</h3>
              </div>

              <div className="AddClubComponent-two-in-two">
                <div className="AddClubComponent-two-in-two-a">
                  <div className="AddClubComponent-two-in-two-a-one">
                    {/* <p>Enter Lead Username:</p>  */}
                    <input
                      type="text"
                      placeholder="Username should be University id"
                      name="leadUsername"
                      value={clubData.leadUsername}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="AddClubComponent-two-in-two-a-two">
                    {/* <p>Enter Lead name:</p>  */}
                    <input
                      type="text"
                      placeholder="Lead name"
                      name="leadName"
                      value={clubData.leadName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="AddClubComponent-two-in-two-a-three">
                    {/* <p>Enter Lead email:</p>  */}
                    <input
                      type="email"
                      placeholder="Lead email"
                      name="leadEmail"
                      value={clubData.leadEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="AddClubComponent-two-in-two-b">
                  <div className="AddClubComponent-two-in-two-b-one">
                    {/* <p>Enter Lead password:</p>  */}
                    <input
                      type="password"
                      placeholder="Lead password"
                      name="leadPassword"
                      value={clubData.leadPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="AddClubComponent-two-in-two-b-two">
                    {/* <p>Confirm password:</p>  */}
                    <input
                      type="email"
                      placeholder="Lead confirm password"
                      name="leadConfirmPassword"
                      value={clubData.leadConfirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="AddClubComponent-two-in-two-d">
                  <div className="AddClubComponent-two-in-two-d-one">
                    <h3>Club details</h3>
                  </div>
                </div>

                <div className="AddClubComponent-two-in-two-e">
                  <div className="AddClubComponent-two-in-two-e-one">
                    {/* <p>Enter name of the club:</p>  */}
                    <input
                      type="text"
                      value={clubData.clubName}
                      placeholder="Name of the club"
                      name="clubName"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="AddClubComponent-two-in-two-e-two">
                    {/* <p>Select the domain</p>  */}
                    <select
                      name="clubDomain"
                      value={clubData.clubDomain}
                      onChange={handleChange}
                    >
                      <option value="">Select domain</option>
                      <option value="TEC">TEC</option>
                      <option value="LCH">LCH</option>
                      <option value="ESO">ESO</option>
                      <option value="IIE">IIE</option>
                      <option value="HWB">HWB</option>
                    </select>
                  </div>

                  <div className="AddClubComponent-two-in-two-e-three">
                    <button onClick={handleSubmit}>Add Club</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Page;
