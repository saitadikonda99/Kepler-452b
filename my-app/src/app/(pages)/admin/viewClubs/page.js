"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./page.css";

// import components here
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/page";
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
        const response = await axios.post("/api/admin/clubUpdate/deleteClub", {clubId, active}, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

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
        }
        else {
          toast.error("Failed to delete the club")
        }
      } catch (error) {
        toast.error(error.message)
      }
    };

  return (
    <div className="ViewClubs">
      <div className="ViewClubs-in">
        <div className="ViewClubs-Nav">
          <Navbar />
        </div>
        <div className="ViewClubs-one">
          <div className="ViewClubs-one-in">
            <div className="DC-sideBar">
              <Sidebar />
            </div>
            <div className="DC-one">
              
              {Array.isArray(clubData) &&
                clubData.map((club) => (
                  <div key={club.club_id} className="DC-one-card">
                    <div className="DC-one-card-in">
                      <div className="DC-one-card-logo">
                        <img src={club.club_logo} alt="club logo" />
                      </div>
                      <div className="DC-one-card-details">
                        <div className="DC-one-card-details-in">
                          <div className="DC-one-card-details-name">
                            <h3>{club.club_name}</h3>
                          </div>
                          <div className="DC-one-card-details-lead">
                            <p>
                              <strong>Lead: </strong>
                              {club.user_name}
                            </p>
                            <p>
                              <strong>Lead email: </strong>
                              {club.email}
                            </p>
                          </div>
                          <div className="DC-one-card-details-domain">
                            <p>
                              <strong>Domain: </strong>
                              {club.club_domain}
                            </p>
                          </div>
                          <div className="DC-one-card-details-domain">
                              {club.active === 1? 
                                <button onClick={() => handleDelete(club.club_id, 0)}>
                                  Hold
                                </button> : 
                                <button onClick={() => handleDelete(club.club_id, 1)}>
                                  Activate
                                </button>
                              }
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="ViewClubs-Footer">
          <div className="ViewClubs-Footer-in">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
