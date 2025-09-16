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
  const [loading, setLoading] = useState(true);

  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const domains = ["all", "TEC", "LCH", "ESO", "IIE", "HWB"];
  const statusOptions = ["all", "upcoming", "completed"];

   

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/activities");

        console.log(response.data);

        if (response.status === 200) {
          setActivities(response.data);
        } else {
          toast.error("Failed to fetch activities");
        }
      } catch (error) {
        toast.error("Internal server error");
      } finally {
        setLoading(false);
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

      const matchesDomain =
        selectedDomain === "all" || activity.club_domain === selectedDomain;

      const currentDate = new Date();
      const activityDate = new Date(activity.activity_date);
      currentDate.setHours(0, 0, 0, 0);
      activityDate.setHours(0, 0, 0, 0);
      
      const matchesStatus = 
        selectedStatus === "all" ? true :
        selectedStatus === "upcoming" ? activityDate >= currentDate :
        selectedStatus === "completed" ? activityDate < currentDate : true;

      return matchesSearch && matchesDomain && matchesStatus;
    });

    // Sort activities based on status
    return filtered.sort((a, b) => {
      const dateA = new Date(a.activity_date);
      const dateB = new Date(b.activity_date);
      
      if (selectedStatus === "upcoming") {
        // For upcoming activities, sort by date ascending (earliest first)
        return dateA - dateB;
      } else if (selectedStatus === "completed") {
        // For completed activities, sort by date descending (most recent first)
        return dateB - dateA;
      } else {
        // For all activities, sort by date descending (most recent first)
        return dateB - dateA;
      }
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
  }, [searchTerm, selectedStatus, selectedDomain]);

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
          </div>
        </div>

        <div className="activitiesComponent-one">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading activities...</p>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="empty-state">
              <p>No activities found matching your criteria.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Club Name</th>
                  <th>Club Domain</th>
                  <th>Activity Name</th>
                  <th>Activity Type</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Report</th>
                  <th>Participants</th>
                </tr>
              </thead>
              <tbody>
                {currentActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.club_name}</td>  
                    <td>{activity.club_domain}</td>
                    <td>{activity.activity_name}</td>
                    <td>{activity.activity_type}</td>
                    <td>
                      {new Date(activity.activity_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>{activity.activity_venue}</td>
                    <td>
                      {activity.activity_report ? (
                        <a href={activity.activity_report} target="_blank" rel="noopener noreferrer" className="report-link">
                          View Report
                        </a>
                      ) : (
                        new Date(activity.activity_date) > new Date() ? (
                          <span className="upcoming">Upcoming</span>
                        ) : (
                          <span className="na">N/A</span>
                        )
                      )}
                    </td>
                    <td>{activity.total_participants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="pagination">
            <div className="pagination-info">
              <span>
                Showing {indexOfFirstActivity + 1} to {Math.min(indexOfLastActivity, filteredActivities.length)} of {filteredActivities.length} activities
              </span>
            </div>
            <div className="pagination-controls">
              <button
                className="previous"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                Previous
              </button>
              <div className="page-numbers">
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
              </div>
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
    </div>
  );
};

export default page;
