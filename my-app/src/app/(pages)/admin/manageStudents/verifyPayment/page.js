"use client"
import React, { useState, useEffect } from 'react';
import Dashboard from '../../dashboard/dashboard';
import Loading from '../../../../animation/Loading';
import './page.css';

const PAGE_SIZE = 15;

const VerifyPayment = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [studentCount, setStudentCount] = useState(0);

  const fetchStudents = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/manageStudents?page=${page}&pageSize=${PAGE_SIZE}`);
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
  }, [currentPage]);

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
      }
    } catch (error) {
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

      if (response.ok) {
        fetchStudents(currentPage);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <div className="VerifyPaymentComponent">
        <div className="VerifyPaymentComponent-in">
          <h1>Verify Student Payments</h1>
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
                    <td className={`status ${student.payment_status}`}>
                      {student.payment_status || 'unpaid'}
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

export default VerifyPayment;
