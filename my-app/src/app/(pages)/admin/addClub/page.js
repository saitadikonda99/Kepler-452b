"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import "./page.css";

// import components here
import Dashboard from '../dashboard/dashboard'

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
          <div className="AddClubComponent">
              <div className="AddClub-one">
                <h1>AddClub</h1>
                <p>Please carefully enter the details</p>
              </div>
              <div className="AddClub-two">
                <div className="AddClub-two-in">
                  <div className="AddClub-head-one">
                    <p>Enter the club lead details</p>
                    <p>
                      Note: club lead username should be Id of the university
                    </p>
                  </div>

                  <div className="AddClub-in-four">
                    <input
                      type="text"
                      placeholder="Lead username"
                      name="leadUsername"
                      value={clubData.leadUsername}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="AddClub-in-five">
                    <input
                      type="text"
                      placeholder="Lead name"
                      name="leadName"
                      value={clubData.leadName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="AddClub-in-six">
                    <input
                      type="email"
                      placeholder="Lead email"
                      name="leadEmail"
                      value={clubData.leadEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="AddClub-in-six">
                    <input
                      type="password"
                      placeholder="Lead password"
                      name="leadPassword"
                      value={clubData.leadPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="AddClub-in-six">
                    <input
                      type="email"
                      placeholder="Lead confirm password"
                      name="leadConfirmPassword"
                      value={clubData.leadConfirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="AddClub-head-one">
                    <p>Enter the club details</p>
                  </div>

                  <div className="AddClub-in-one">
                    <input
                      type="text"
                      value={clubData.clubName}
                      placeholder="Name of the club"
                      name="clubName"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="AddClub-in-one">
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
                  <div className="AddClub-in-seven">
                    <button onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
      </Dashboard>
  );
};

export default Page;
