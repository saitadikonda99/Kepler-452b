"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./page.css";

// import components here
import Dashboard from "../dashboard/dashboard";
import toast from "react-hot-toast";

const page = () => {
  const [clubData, setClubData] = useState([]);

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
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (clubId, active) => {
    try {
      const response = await axios.post(
        "/api/admin/clubUpdate/deleteClub",
        { clubId, active },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.status === 200) {
        toast.success(response.data.message);
        const updatedClubData = clubData.map((club) => {
          if (club.club_id === clubId) {
            return {
              ...club,
              active: active,
            };
          }
          return club;
        });
        setClubData(updatedClubData);
      } else {
        toast.error("Failed to delete the club");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dashboard>
      <div className="ManageClubsComponent">
        <div className="ManageClubsComponent-in">
          <div className="ManageClubs-one">
            <div className="ManageClubs-one-in">
              <div className="ManageClubs-one-in-one">
                <h1>Manage Clubs</h1>
              </div>
            </div>
          </div>

          <div className="ManageClubs-two">
            <div className="ManageClubs-two-in">
              <table>
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Club Logo</th>
                    <th>Club Name</th>
                    <th>Lead</th>
                    <th>Lead Email</th>
                    <th>Domain</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(clubData) && clubData.length > 0 ? (
                    clubData.map((club, index) => (
                      <tr key={club.club_id}>
                        <td>{++index}</td>
                        <td>
                          <img
                            src={club.club_logo}
                            alt="club logo"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>{club.club_name}</td>
                        <td>{club.user_name}</td>
                        <td>{club.email}</td>
                        <td>{club.club_domain}</td>
                        <td>{club.active === 1 ? "Active" : "Inactive"}</td>
                        <td>
                          {club.active === 1 ? (
                            <button
                              className="HoldButton"
                              onClick={() => handleDelete(club.club_id, 0)}
                            >
                              Hold
                            </button>
                          ) : (
                            <button
                              className="ActivateButton"
                              onClick={() => handleDelete(club.club_id, 1)}
                            >
                              Activate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No clubs found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
