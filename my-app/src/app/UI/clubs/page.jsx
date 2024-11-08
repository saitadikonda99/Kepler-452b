"use client"
import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

import "./page.css";


const page = () => {
  const [clubData, setClubData] = React.useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/api/getClubs", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        console.log(response);

        if (response.status === 200) {
          setClubData(response.data);
        } else {
          toast.error("Failed to fetch stats");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };

    fetch();
  }, []);

  const techClubs = clubData.filter((club) => club.club_domain === "TEC" && club.active === 1);
  const lchClubs = clubData.filter((club) => club.club_domain === "LCH" && club.active === 1);
  const esoClubs = clubData.filter((club) => club.club_domain === "ESO" && club.active === 1);
  const hieClubs = clubData.filter((club) => club.club_domain === "HIE" && club.active === 1);
  const hwbClubs = clubData.filter((club) => club.club_domain === "HWB" && club.active === 1);

  return (
    <div className="HomeClubs clubs-list">
      <div className="HomeClubs-in">
        <div className="breadcrumb">
          <span>Home / Clubs</span>
        </div>

        <div className="cmn-heading">
          <h1>Explore Various Categories of Clubs</h1>
        </div>

        <div className="HomeClubs-in-one">
          <div className="HomeClubs-box">
            <div className="HomeClubs-box-in">
              <h2>TEC</h2>
              <div className="HomeClubs-box-in-desc">
                <p>Central Technology Clubs under SAC</p>
              </div>
              <div className="HomeClubs-box-in-one">
                <div className="HomeClubs-box-in-one-in">
                  {techClubs.map((club) => (
                    <Link
                      href={`/Clubpage/${club.id}`}
                      className="HomeClubs-box-in-one-in-link"
                      key={club.id}
                    >
                      {club.club_name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="HomeClubs-box">
            <div className="HomeClubs-box-in">
              <h2>LCH</h2>
              <div className="HomeClubs-box-in-desc">
                <p>Liberal Arts, Creative Arts and Hobby Clubs</p>
              </div>

              <div className="HomeClubs-box-in-one">
                <div className="HomeClubs-box-in-one-in">
                  {lchClubs.map((club) => (
                    <Link
                    href={`/Clubpage/${club.id}`}
                      className="HomeClubs-box-in-one-in-link"
                      key={club.club_id}
                    >
                      {club.club_name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="HomeClubs-box">
            <div className="HomeClubs-box-in">
              <h2>ESO</h2>
              <div className="HomeClubs-box-in-desc">
                <p>Extension & Society Outreach Clubs</p>
              </div>

              <div className="HomeClubs-box-in-one">
                <div className="HomeClubs-box-in-one-in">
                  {esoClubs.map((club) => (
                    <Link
                      href={`/Clubpage/${club.id}`}
                      className="HomeClubs-box-in-one-in-link"
                      key={club.club_id}
                    >
                      {club.club_name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="HomeClubs-box">
            <div className="HomeClubs-box-in">
              <h2>IIE</h2>
              <div className="HomeClubs-box-in-desc">
                <p>Innovation, Incubation and Entrepreneurship Clubs</p>
              </div>

              <div className="HomeClubs-box-in-one">
                <div className="HomeClubs-box-in-one-in">
                  {hieClubs.map((club) => (
                    <Link
                      href={`/Clubpage/${club.id}`}
                      className="HomeClubs-box-in-one-in-link"
                      key={club.club_id}
                    >
                      {club.club_name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="HomeClubs-box">
            <div className="HomeClubs-box-in">
              <h2>HWB</h2>
              <div className="HomeClubs-box-in-desc">
                <p>Health and Wellbeing Clubs</p>
              </div>

              <div className="HomeClubs-box-in-one">
                <div className="HomeClubs-box-in-one-in">
                  {hwbClubs.map((club) => (
                    <Link
                      href={`/Clubpage/${club.id}`}
                      className="HomeClubs-box-in-one-in-link"
                      key={club.club_id}
                    >
                      {club.club_name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
