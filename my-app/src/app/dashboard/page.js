"use client";
import React from "react";
import Sidebar from "./components/sidebar";
import "./page.css";

import TotalMembersChart from "../dashboard/charts/dashboard/totalMembers/chart";
import ClubMembers from "../dashboard/charts/dashboard/clubMembers/chart";

import { IoPeople } from "react-icons/io5";

const page = () => {
  return (
    <div className="AnalyticsComponent">
      <div className="AnalyticsComponent-in">
        <div className="AnalyticsComponent-one">
          <Sidebar />
        </div>
        <div className="AnalyticsComponent-two">
          <div className="AnalyticsComponent-two-in">
            <div className="DashboardA">
              <div className="DashboardA-in">

                <div className="DashboardA-in-one">
                  <div className="DashboardA-in-one-one">

                    <div className="DashboardA-stats">
                      <div className="DashboardA-stats-in">
                        <p>Students</p>
                        <h1>6,234</h1>
                      </div>
                    </div>

                    <div className="DashboardA-stats">
                      <div className="DashboardA-stats-in">
                        <p>Domains</p>
                        <h1>5</h1>
                      </div>
                    </div>

                    <div className="DashboardA-stats">
                      <div className="DashboardA-stats-in">
                        <p>Clubs</p>
                        <h1>33</h1>
                      </div>
                    </div>


                    <div className="DashboardA-stats">
                      <div className="DashboardA-stats-in">
                        <p>Events</p>
                        <h1>400</h1>
                      </div>
                    </div>

                    <div className="DashboardA-stats">
                      <div className="DashboardA-stats-in">
                        <p>Workshops</p>
                        <h1>80</h1>
                      </div>
                    </div>


                    <div className="DashboardA-stats">
                      <div className="DashboardA-stats-in">
                        <p>Mentors</p>
                        <h1>50</h1>
                      </div>
                    </div>

                  </div>
                </div>


                <div className="DashboardA-in-two">
                  <div className="DashboardA-in-two-one">
                    <p>Stats of total Number of Students in the SAC <IoPeople className="dashboard-icon" /> </p>
                  </div>
                  <div className="DashboardA-in-two-two">
                    <TotalMembersChart />
                  </div>
                </div>

                <div className="DashboardA-in-two">
                  <div className="DashboardA-in-two-one">
                    <p>Stats of total Number of Students in the SAC <IoPeople className="dashboard-icon" /> </p>
                  </div>
                  <div className="DashboardA-in-two-two">
                    <ClubMembers />
                  </div>
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
