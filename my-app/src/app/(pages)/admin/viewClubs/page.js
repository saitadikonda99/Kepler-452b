"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./page.css";

// import components here
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/page";

const page = () => {
  const [clubData, setClubData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/allClubs", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response.data);

      if (response.status === 200) {
        setClubData(response.data);
      }

    };

    fetchData();
  }, []);

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
                  <div key={club.id} className="DC-one-card">
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
                              {club.lead_name}
                            </p>
                          </div>
                          <div className="DC-one-card-details-domain">
                            <p>
                              <strong>Domain: </strong>
                              {club.club_domain}
                            </p>
                          </div>
                          <div className="DC-one-card-details-description">
                            <p>DES: {club.club_description}</p>
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
