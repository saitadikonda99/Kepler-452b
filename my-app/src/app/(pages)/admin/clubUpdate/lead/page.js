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
    leadEmail: "",
    clubId: "",
  });

  const handleSelectChange = (e) => {
    setSelectedClubName(e.target.value);

    const selectedClub = clubData.find(
      (club) => club.club_name === e.target.value
    );

    setUpdatedData({
      leadUsername: selectedClub.username,
      leadEmail: selectedClub.email,
      clubName: selectedClub.club_name,
      clubId: selectedClub.club_id,
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

      toast.success(response.data.message || "Lead updated successfully");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400:
            toast.error(data.message || "Bad request. Please check your input.");
            break;
          case 401:
            toast.error("Unauthorized. Please log in again.");
            break;
          case 403:
            toast.error("Forbidden. You don't have permission for this action.");
            break;
          case 409:
            toast.error(data.message || "User or club already exists");
            break;
          default:
            toast.error(data.message || "An error occurred. Please try again.");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
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
                  type="email"
                  placeholder="Enter new lead email"
                  value={updatedData.leadEmail}
                  name="leadEmail"
                  onChange={handleChange}
                />
              </div>
              <div className="UpdateClubLeadComponent-two-c-button">
                <button onClick={handleSubmit}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
