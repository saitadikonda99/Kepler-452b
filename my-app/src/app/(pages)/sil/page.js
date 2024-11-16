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
        activity.activity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.activity_type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClub = 
        selectedClub === "all" || activity.club_name === selectedClub;

      return matchesSearch && matchesClub;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.activity_date);
      const dateB = new Date(b.activity_date);
      return dateA - dateB;
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
  }, [searchTerm]);

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
          
          <select 
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="club-filter"
          >
            <option value="all">All Clubs</option>
            {clubData.map((club) => (
              <option key={club.id} value={club.name}>
                {club.club_name}
              </option>
            ))}
          </select>
        </div>

        <div className="activitiesComponent-one">
          <table>
            <thead>
              <tr>
                <th>Name of the Club</th>
                <th>Activity Title</th>
                <th>WorkShop / Activity</th>
                <th>Activity Date</th>
                <th>Venue</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.club_name}</td>
                  <td>{activity.activity_name}</td>
                  <td>{activity.activity_type}</td>
                  <td>
                    {new Date(activity.activity_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td>{activity.venue}</td>
                  <td>
                    <Link href={activity.report_link} target="_blank" passHref={true}>View Report</Link>
                  </td>
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
