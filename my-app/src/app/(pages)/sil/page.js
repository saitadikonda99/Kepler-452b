"use client"
import React, { useState } from 'react';
import './page.css';

import silArray from '../../../data/silArray'; // Adjust the path as needed
import Navbar from './Navbar';
import Footer from '../../Components/Footer/page';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(10);

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = silArray.slice(indexOfFirstActivity, indexOfLastActivity);

  const totalPages = Math.ceil(silArray.length / activitiesPerPage);

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

  // Generate page numbers around the current page
  const pageNumbers = [];
  const pageRange = 2; // Number of pages to show around the current page
  for (let i = Math.max(1, currentPage - pageRange); i <= Math.min(totalPages, currentPage + pageRange); i++) {
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
              <input type="text" id="search" />
            </div>
            <div className="sil-two-fliter">
              <select id="sort">
                <option value="">Sort by</option>
                <option value="date">Date</option>
                {/* Add more sorting options if needed */}
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
                  <td>{activity["Date of the Event"]}</td>
                  <td>{activity.Venue}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1} aria-label="Previous Page">
              Previous
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? 'active' : ''}
                aria-label={`Page ${number}`}
              >
                {number}
              </button>
            ))}
            <button onClick={handleNext} disabled={currentPage === totalPages} aria-label="Next Page">
              Next
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Page;
