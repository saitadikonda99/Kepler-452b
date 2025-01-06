"use client"
import React, { useState, useEffect } from 'react';
import Dashboard from '../../dashboard/dashboard';
import Loading from '../../../../animation/Loading';
import { toast } from "react-hot-toast";
import Pagination from '../../../../Components/Pagination/Pagination';
import axios from 'axios';

import './page.css';

const PAGE_SIZE = 15;

const VerifyPayment = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [studentCount, setStudentCount] = useState(0);
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchClubs = async () => {
    try {
      const { data } = await axios.get('/api/getClubs');
      setClubs(data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchStudents = async (page) => {
    try {
      setLoading(true);
      const params = {
        page,
        pageSize: PAGE_SIZE,
        ...(selectedClub && { clubId: selectedClub }),
        ...(searchTerm && { search: searchTerm })
      };
      
      const response = await fetch(`/api/admin/manageStudents?${new URLSearchParams(params)}`);
      const data = await response.json();
      setStudents(data.users);
      setStudentCount(data.totalCount);
      setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage, selectedClub, searchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleVerifyPayment = async (userId, currentStatus) => {
    try {
      setLoading(true);
      const newStatus = currentStatus === 'Paid' ? 'Unpaid' : 'Paid';
      
      const response = await fetch(`/api/admin/verifyPayments/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_status: newStatus }),
      });

      if (response.ok) {
        fetchStudents(currentPage);
        toast.success("Payment status updated successfully");
      }
    } catch (error) {
      toast.error("Error updating payment status");
      console.error('Error updating payment status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/verifyPayments/${userId}`, {
        method: 'DELETE',
      });

      console.log(response);

      if (response.ok) {
        fetchStudents(currentPage);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClubChange = (e) => {
    setSelectedClub(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);

    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debouncing
    const timeout = setTimeout(() => {
      setSearchTerm(value);
    }, 500);

    setSearchTimeout(timeout);
  };

  return (
    <Dashboard>
      <div className="VerifyPaymentComponent">
        <div className="VerifyPaymentComponent-in">
          <h1>Verify Student Payments</h1>
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
            <input
              type="text"
              placeholder="Search by name, ID, phone, or ERP reference..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <p>Total students registered for the SAC: {studentCount}</p>
          {loading && <Loading />}
          <table>
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>ERP Reference</th>
                <th>Payment Status</th>
                <th>Verify</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {students?.length > 0 ? (
                students.map((student) => (
                  <tr key={student.user_id}>
                    <td>{student.id_number}</td>
                    <td>{student.user_name}</td>
                    <td>{student.phone_number || 'N/A'}</td>
                    <td>{student.erp_reference_number || 'N/A'}</td>
                    <td className={`status ${student.payment_status?.toLowerCase()}`}>
                      {student.payment_status || 'Unpaid'}
                    </td>
                    <td>
                      <button
                        className={`verify-btn ${student.payment_status}`}
                        onClick={() => handleVerifyPayment(student.user_id, student.payment_status)}
                      >
                        {student.payment_status === 'Paid' ? 'Mark Unpaid' : 'Verify Payment'}
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteUser(student.user_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default VerifyPayment;
