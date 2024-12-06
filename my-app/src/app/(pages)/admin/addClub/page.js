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
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
                <h3>Club Lead Details (optional)</h3>
              </div>

              <div className="AddClubComponent-two-in-two">
                <div className="AddClubComponent-two-in-two-a">
                  <div className="AddClubComponent-two-in-two-a-one">
                    <input
                      type="text"
                      placeholder="Username should be University id"
                      name="leadUsername"
                      value={clubData.leadUsername}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="AddClubComponent-two-in-two-a-three">
                    <input
                      type="email"
                      placeholder="Lead email"
                      name="leadEmail"
                      value={clubData.leadEmail}
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
                    <input
                      type="text"
                      value={clubData.clubName}
                      placeholder="Name of the club"
                      name="clubName"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="AddClubComponent-two-in-two-d-two">
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
