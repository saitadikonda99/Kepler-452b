"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import "./page.css";

import Navbar from './Navbar'

const page = () => {
  const clubId = useParams().clubId;
  const [activities, setActivities] = useState([]);
  
  // Add new states for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(12);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/api/activities/${clubId}`);

        if (response.status === 200) {
          setActivities(response.data);
        } else {
          toast.error("Failed to fetch activities");
        }
      } catch (error) {
        console.log(error);
        toast.error("Internal server error");
      }
    };

    fetch();
  }, [clubId]);

  // Filter and sort activities
  const getFilteredAndSortedActivities = () => {
    return activities.filter((activity) =>
      activity.activity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.activity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.venue.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
      const dateA = new Date(a.activity_date);
      const dateB = new Date(b.activity_date);
      return dateB - dateA; // Newest first
    });
  };

  // Pagination logic
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

  // Reset to first page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="clubActivitiesComponent">
      <div className="clubActivitiesComponent-in">

        <div className="clubActivitiesComponent-Nav">
            <Navbar/>
        </div>

        <div className="controls">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="activitiesComponent-one">
          <table>
            <thead>
              <tr>
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
                    <Link href={activity.report_link}>View Report</Link>
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
