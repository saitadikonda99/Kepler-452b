"use client"
import React, { useState, useEffect } from 'react';
import Dashboard from '../../dashboard/dashboard';
import './page.css';

import Loading from '../../../../animation/Loading';

const PAGE_SIZE = 15;  

const ManageStudents = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/manageStudents?page=${currentPage}&pageSize=${PAGE_SIZE}`);
      const data = await response.json();
      setUsers(data.users);
      setStudentCount(data.totalCount);
      setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(users);

  return (
    <Dashboard>
      {loading && <Loading />}
      <div className="ManageStudentsComponent">
        <div className="ManageStudentsComponent-in">
          <h1>Manage Students</h1>
          <p>Total students registered for the SAC: {studentCount}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID Number</th>
                <th>Branch</th>
                <th>Gender</th>
                <th>Residency</th>
                <th>Country</th>
                <th>Domain</th>
                <th>Club</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_name}</td>
                    <td>{user.id_number}</td>
                    <td>{user.branch}</td>
                    <td>{user.gender}</td>
                    <td>{user.residency}</td>
                    <td>{user.country}</td>
                    <td>{user.domain}</td>
                    <td>{user.club_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11}>No users found.</td>
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

export default ManageStudents;