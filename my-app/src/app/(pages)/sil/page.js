"use client";
import React, { useState } from 'react';
import './page.css';

import silArray from '../../../data/silArray'; // Adjust the path as needed
import Navbar from './Navbar';
import Footer from '../../Components/Footer/page';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(''); // New state for year filter

  // Parse and sort activities by date (latest to oldest)
  const sortedActivities = silArray.sort((a, b) => {
    const dateA = new Date(a["Date of the Event"]);
    const dateB = new Date(b["Date of the Event"]);
    return dateB - dateA; // Descending order
  });

  // Get unique years from the activities that have dates
  const uniqueYears = [...new Set(sortedActivities
    .filter(activity => activity["Date of the Event"]) // Filter only those with dates
    .map(activity => new Date(activity["Date of the Event"]).getFullYear()))];

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;

  // Filter activities based on the search term and selected year
  const filteredActivities = sortedActivities.filter(activity => {
    const matchesSearchTerm = (activity["Name of the Club "]?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (activity["Event Title"]?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (activity["Date of the Event"]?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (activity.Venue?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesYear = selectedYear === '' || (activity["Date of the Event"] && new Date(activity["Date of the Event"]).getFullYear() === parseInt(selectedYear));

    return matchesSearchTerm && matchesYear;
  });

  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);

  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Adjusted logic to generate the page numbers range
  const pageNumbers = [];
  const pageRange = 5; // Number of pages to show

  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='SilComponent'>
      <div className="SilComponent-in">
        <div className="SilNavbar">
          <Navbar />
        </div>

        <div className="Sil-two">
          <div className="sil-two-in">
            <p>List of Activities & Events</p>
            <div className="Sil-two-search">
              <label htmlFor="search">Search</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="sil-two-fliter">
              <select id="sort" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                 <option value="">All Activities</option>
                 {uniqueYears.map(year => (
                   <option key={year} value={year}>{year}</option>
                 ))}
                <option value="no-date">No Date</option> {/* Option for activities with no dates */}
              </select>
            </div>
          </div>
        </div>

        <div className="Sil-three">
          <table>
            <thead>
              <tr>
                <th>Name of the Club</th>
                <th>Event Title</th>
                <th>Event Date</th>
                <th>Venue</th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.map(activity => (
                <tr key={activity.Sno}>
                  <td>{activity["Name of the Club "]}</td>
                  <td>{activity["Event Title"]}</td>
                  <td>{activity["Date of the Event"] || "No Date Available"}</td> {/* Handle no date */}
                  <td>{activity.Venue}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button className="previous" onClick={handlePrevious} disabled={currentPage === 1} aria-label="Previous Page">
              Prev
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`page-num ${currentPage === number ? 'page-active' : ''}`}
                aria-label={`Page ${number}`}
              >
                {number}
              </button>
            ))}
            <button className="next" onClick={handleNext} disabled={currentPage === totalPages} aria-label="Next Page">
              Next
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
