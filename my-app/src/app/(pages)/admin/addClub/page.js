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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/addClub", clubData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Club added successfully");
        // Reset form or redirect as needed
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error(error.response.data.message || "Bad request");
            break;
          case 401:
            toast.error("Unauthorized");
            break;
          case 403:
            toast.error("Forbidden");
            break;
          case 409:
            toast.error("Club already exists");
            break;
          default:
            toast.error("An error occurred while adding the club");
        }
      } else {
        toast.error("An error occurred while adding the club");
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
            <h1>Create a new club</h1>
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

                <div className="AddClubComponent-two-in-two-c">
                  <div className="AddClubComponent-two-in-two-c-one">
                    <h3>Club details</h3>
                  </div>
                </div>

                <div className="AddClubComponent-two-in-two-d">
                  <div className="AddClubComponent-two-in-two-d-one">
                    {/* <p>Enter name of the club:</p>  */}
                    <input
                      type="text"
                      value={clubData.clubName}
                      placeholder="Name of the club"
                      name="clubName"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="AddClubComponent-two-in-two-d-two">
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

                  <div className="AddClubComponent-two-in-two-d-three">
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
