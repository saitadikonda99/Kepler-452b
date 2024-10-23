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
            <div className="LU-one">
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
              <p>Lead username should be university id</p>
              <input
                type="text"
                placeholder="Enter new lead username"
                value={updatedData.leadUsername}
                name="leadUsername"
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Enter new lead name"
                value={updatedData.leadName}
                name="leadName"
                onChange={handleChange}
              />

              <input
                type="email"
                placeholder="Enter new lead email"
                value={updatedData.leadEmail}
                name="leadEmail"
                onChange={handleChange}
              />

              <input
                type="password"
                placeholder="Enter new lead password"
                value={updatedData.leadPassword}
                name="leadPassword"
                onChange={handleChange}
              />

              <input
                type="password"
                placeholder="Confirm new lead password"
                value={updatedData.leadConfirmPassword}
                name="leadConfirmPassword"
                onChange={handleChange}
              />

              <button onClick={handleSubmit}>Update</button>
            </div>
    </Dashboard>
  );
};

export default page;
