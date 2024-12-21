"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

import "./page.css";

import Navbar from "./Navbar";

const page = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(12);

  const [clubData, setClubData] = React.useState([]);
  const [selectedClub, setSelectedClub] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const domains = ["all", "TEC", "LCH", "ESO", "IIE", "HWB"];
  const statusOptions = ["all", "upcoming", "completed"];

  const filteredClubs = React.useMemo(() => {
    if (selectedDomain === "all") {
      return clubData.filter(club => club.active === 1);
    }
    return clubData.filter(
      (club) => club.club_domain === selectedDomain && club.active === 1
    );
  }, [clubData, selectedDomain]);

  useEffect(() => {
    setSelectedClub("all");
  }, [selectedDomain]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/api/getClubs", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setClubData(response.data);
        } else {
          toast.error("Failed to fetch clubs");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/activities");

        console.log(response.data);

        if (response.status === 200) {
          setActivities(response.data);
        } else {
          toast.error("Failed to fetch UpcomingEvents");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };
    fetchData();
  }, []);

  const getFilteredAndSortedActivities = () => {
    let filtered = activities.filter((activity) => {
      const matchesSearch =
        activity.club_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.session_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.session_type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClub = 
        selectedClub === "all" || activity.club_name === selectedClub;

      const matchesDomain =
        selectedDomain === "all" || activity.club_domain === selectedDomain;

      const currentDate = new Date();
      const sessionDate = new Date(activity.session_date);
      currentDate.setHours(0, 0, 0, 0);
      sessionDate.setHours(0, 0, 0, 0);
      
      const matchesStatus = 
        selectedStatus === "all" ? true :
        selectedStatus === "upcoming" ? sessionDate >= currentDate :
        selectedStatus === "completed" ? sessionDate < currentDate : true;

      return matchesSearch && matchesClub && matchesDomain && matchesStatus;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.session_date);
      const dateB = new Date(b.session_date);
      return selectedStatus === "upcoming" ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredActivities = getFilteredAndSortedActivities();
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  return (
    <div className="activitiesComponent">
      <div className="activitiesComponent-in">
        
        <div className="activitiesComponent-Nav">
          <Navbar />
        </div>

        <div className="controls">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <div className="filters">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="status-filter"
            >
              <option value="all">All Activities</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="domain-filter"
            >
              <option value="all">All Domains</option>
              {domains.filter(domain => domain !== "all").map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>

            <select 
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="club-filter"
            >
              <option value="all">All Clubs</option>
              {filteredClubs.map((club) => (
                <option key={club.id} value={club.club_name}>
                  {club.club_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="activitiesComponent-one">
          <table>
            <thead>
              <tr>
                <th>Club Name</th>
                <th>Session Name</th>
                <th>Session Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Report</th>
                <th>Participants</th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.map((session) => (
                <tr key={session.session_id}>
                  <td>{session.club_name}</td>
                  <td>{session.session_name}</td>
                  <td>{session.session_type}</td>
                  <td>
                    {new Date(session.session_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    {new Date(`2000-01-01 ${session.session_sTime}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                    {" - "}
                    {new Date(`2000-01-01 ${session.session_eTime}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </td>
                  <td>{session.session_venue}</td>
                  <td>
                    {session.session_report ? (
                      <a href={session.session_report} target="_blank" rel="noopener noreferrer" className="report-link">
                        View Report
                      </a>
                    ) : (
                      new Date(session.session_date) > new Date() ? (
                        <span className="upcoming">Upcoming</span>
                      ) : (
                        <span className="na">N/A</span>
                      )
                    )}
                  </td>
                  <td>{session.total_participants}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="previous"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              Prev
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`page-num ${
                  currentPage === number ? "page-active" : ""
                }`}
                aria-label={`Page ${number}`}
              >
                {number}
              </button>
            ))}
            <button
              className="next"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
