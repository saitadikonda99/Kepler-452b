"use client"
import React, { useState, useEffect } from 'react';
import Dashboard from '../../dashboard/dashboard';
import Loading from '../../../../animation/Loading';
import { toast } from "react-hot-toast";
import Pagination from '../../../../Components/Pagination/Pagination';
import axios from 'axios';
import { branchNames } from '../../../clubRegistration/branchData/data';

import './page.css';

const PAGE_SIZE = 15;

const getCurrentAcademicYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
  
  // If current month is before June, consider previous year as academic year
  return currentMonth < 6 ? (currentYear - 1).toString() : currentYear;
};

const getYearOptions = () => {
  const currentAcademicYear = getCurrentAcademicYear();
  return [
    { value: currentAcademicYear, label: `${currentAcademicYear} - 1st Year` },
    { value: (parseInt(currentAcademicYear) - 1).toString(), label: `${parseInt(currentAcademicYear) - 1} - 2nd Year` },
    { value: (parseInt(currentAcademicYear) - 2).toString(), label: `${parseInt(currentAcademicYear) - 2} - 3rd Year` },
    { value: (parseInt(currentAcademicYear) - 3).toString(), label: `${parseInt(currentAcademicYear) - 3} - 4th Year` }
  ];
};

const VerifyPayment = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [studentCount, setStudentCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    setYearOptions(getYearOptions());
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage, selectedBranch, selectedYear, selectedCourse]);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get('/api/getCourses');
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchStudents = async (page) => {
    try {
      setLoading(true);
      const params = {
        page,
        pageSize: PAGE_SIZE,
        ...(selectedBranch && { branch: selectedBranch }),
        ...(selectedYear && { year: selectedYear }),
        ...(selectedCourse && { courseId: selectedCourse })
      };
      
      const { data } = await axios.get(`/api/lead/manageSessions/viewStudents`, { params });
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

  const handleVerifyPayment = async (userId, currentStatus) => {
    try {
      setLoading(true);
      const newStatus = currentStatus === 'Paid' ? 'Unpaid' : 'Paid';
      
      const response = await axios.put(`/api/lead/manageSessions/verifyPayments/${userId}`, {
        payment_status: newStatus
      });

      if (response.status === 200) {
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
      const response = await axios.delete(`/api/lead/manageSessions/verifyPayments/${userId}`);

      if (response.status === 200) {
        fetchStudents(currentPage);
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting user");
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
    setCurrentPage(1);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Dashboard>
      <div className="VerifyPaymentComponent">
        <div className="VerifyPaymentComponent-in">
          <h1>Verify Student Payments</h1>
          <div className="filter-section">
            <select 
              value={selectedYear} 
              onChange={handleYearChange}
              className="year-select"
            >
              <option value="">All Years</option>
              {yearOptions.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>

            <select 
              value={selectedBranch} 
              onChange={handleBranchChange}
              className="branch-select"
            >
              <option value="">All Branches</option>
              {branchNames.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>

            <select 
              value={selectedCourse} 
              onChange={handleCourseChange}
              className="course-select"
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
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
                <th>Year</th>
                <th>Branch</th>
                <th>Course</th>
                <th>Course Code</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students?.length > 0 ? (
                students.map((student) => (
                  <tr key={student.user_id}>
                    <td>{student.id_number}</td>
                    <td>{student.user_name}</td>
                    <td>{student.year || 'N/A'}</td>
                    <td>{student.branch || 'N/A'}</td>
                    <td>{student.course_name || 'N/A'}</td>
                    <td>{student.course_code || 'N/A'}</td>
                    <td className={`status ${student.payment_status?.toLowerCase()}`}>
                      {student.payment_status || 'Unpaid'}
                    </td>
                    <td className="actions">
                      <button
                        className={`verify-btn ${student.payment_status}`}
                        onClick={() => handleVerifyPayment(student.user_id, student.payment_status)}
                      >
                        {student.payment_status === 'Paid' ? 'Mark Unpaid' : 'Verify Payment'}
                      </button>
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
                  <td colSpan={8}>No students found.</td>
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
