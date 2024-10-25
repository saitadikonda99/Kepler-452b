"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// imports start here
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/page";

import "./page.css";
import Dashboard from "../../dashboard/dashboard";

const page = () => {
  const [clubData, setClubData] = useState([]);
  const [selectedClubName, setSelectedClubName] = useState("");

  const [updatedData, setUpdatedData] = useState({
    clubName: "",
    leadUsername: "",
    leadName: "",
    leadEmail: "",
    leadPassword: "",
    leadConfirmPassword: "",
  });

  const handleSelectChange = (e) => {

    setSelectedClubName(e.target.value);

    const selectedClub = clubData.find(
      (club) => club.club_name === e.target.value
    );

    setUpdatedData({
      leadUsername: selectedClub.username,
      leadName: selectedClub.user_name,
      leadEmail: selectedClub.email,
      clubName: selectedClub.club_name,
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/admin/getClubDetails", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setClubData(response.data);
      } else {
        toast.error("Internal server error");
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "/api/admin/clubUpdate/lead",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Lead updated successfully");
      }
      

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
            toast.error(
              error.response.data.message || "User or club already exists"
            );
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

  return (
        <Dashboard>
            <div className="UpdateClubLead">
              <div className="UpdateClubLeadComponent">
                <div className="UpdateClubLeadComponent-one">
                  <h1>Update Club Lead</h1>
                </div>
                <div className="UpdateClubLeadComponent-two">
                  <div className="UpdateClubLeadComponent-two-a">
                    <select value={selectedClubName} onChange={handleSelectChange}>
                    <option value="" disabled>
                      Select a club
                    </option>
                    {Array.isArray(clubData) &&
                      clubData.map((club) => (
                        club.active === 1 && (
                          <option key={club.club_id} value={club.club_name}>
                            {club.club_name}
                          </option>
                        )
                      ))}
                    </select>
                </div>
                <div className="UpdateClubLeadComponent-two-b">
                  <div className="UpdateClubLeadComponent-two-b-box">
                    <input
                    type="text"
                    placeholder="Username should be University id"
                    value={updatedData.leadUsername}
                    name="leadUsername"
                    onChange={handleChange}
                    />
                  </div>
                  <div className="UpdateClubLeadComponent-two-b-box">
                    <input
                    type="text"
                    placeholder="Enter new lead name"
                    value={updatedData.leadName}
                    name="leadName"
                    onChange={handleChange}
                    />
                  </div>
                  <div className="UpdateClubLeadComponent-two-b-box">
                    <input
                    type="email"
                    placeholder="Enter new lead email"
                    value={updatedData.leadEmail}
                    name="leadEmail"
                    onChange={handleChange}
                    />
                  </div>
                </div>  
                <div className="UpdateClubLeadComponent-two-c"> 
                  <div className="UpdateClubLeadComponent-two-c-box">
                   <input
                   type="password"
                   placeholder="Enter new lead password"
                   value={updatedData.leadPassword}
                   name="leadPassword"
                   onChange={handleChange}
                   />
                  </div>
                  <div className="UpdateClubLeadComponent-two-c-box"> 
                   <input
                   type="password"
                   placeholder="Confirm new lead password"
                   value={updatedData.leadConfirmPassword}
                   name="leadConfirmPassword"
                   onChange={handleChange}
                   />
                  </div>
                  <div className="UpdateClubLeadComponent-two-c-button">
                   <button onClick={handleSubmit}>Update</button>
                  </div>
                </div> 
            </div>
            </div>
          </ div>
    </Dashboard>
  );
};

export default page;
