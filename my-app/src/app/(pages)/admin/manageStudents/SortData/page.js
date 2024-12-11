"use client"
import React, { useState, useEffect } from 'react';
import Dashboard from '../../dashboard/dashboard';
import Loading from '../../../../animation/Loading';
import axios from 'axios';
import './page.css';

const PAGE_SIZE = 15;

const SortData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [studentCount, setStudentCount] = useState(0);
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage, selectedClub]);

  const fetchClubs = async () => {
    try {
      const { data } = await axios.get('/api/getClubs');
      console.info(data)
      setClubs(data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const fetchStudents = async (page) => {
    try {
      setLoading(true);
      const url = `/api/admin/sortData`;
      const params = {
        page,
        pageSize: PAGE_SIZE,
        ...(selectedClub && { clubId: selectedClub })
      };

      const { data } = await axios.get(url, { params });
      setStudents(data.users);
      setStudentCount(data.totalCount);
      setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClubChange = (e) => {
    setSelectedClub(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Dashboard>
      <div className="SortDataComponent">
        <div className="SortDataComponent-in">
          <h1>Club-wise Student Data</h1>
          <div className="filter-section">
            <select 
              value={selectedClub} 
              onChange={handleClubChange}
              className="club-select"
            >
              <option value="">All Clubs</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.club_name}
                </option>
              ))}
            </select>
          </div>
          <p>Total students: {studentCount}</p>
          {loading && <Loading />}
          <table>
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Name</th>
                <th>Club</th>
                <th>Course</th>
                <th>Course Code</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {students?.length > 0 ? (
                students.map((student) => (
                  <tr key={student.user_id}>
                    <td>{student.id_number}</td>
                    <td>{student.user_name}</td>
                    <td>{student.club_name || 'N/A'}</td>
                    <td>{student.course_name || 'N/A'}</td>
                    <td>{student.course_code || 'N/A'}</td>
                    <td className={`status ${student.payment_status?.toLowerCase()}`}>
                      {student.payment_status || 'Unpaid'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="previous"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-num ${currentPage === index + 1 ? "page-active" : ""}`}
                aria-label={`Page ${index + 1}`}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default SortData;
