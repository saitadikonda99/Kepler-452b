"use client"
import React, { useState, useEffect } from 'react';
import Dashboard from '../../dashboard/dashboard';
import Loading from '../../../../animation/Loading';
import axios from 'axios';
import { branchNames } from '../../../clubRegistration/branchData/data';
import './page.css';
import Pagination from '../../../../Components/Pagination/Pagination';

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

const SortData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [studentCount, setStudentCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    setYearOptions(getYearOptions());
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchStudents(currentPage);
    fetchCourses();
  }, [currentPage, selectedBranch, selectedYear, selectedCourse]);


  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`/api/getCourses`);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchStudents = async (page) => {
    try {
      setLoading(true);
      const url = `/api/lead/manageSessions/viewStudents`;
      const params = {
        page,
        pageSize: PAGE_SIZE,
        ...(selectedBranch && { branch: selectedBranch }),
        ...(selectedYear && { year: selectedYear }),
        ...(selectedCourse && { courseId: selectedCourse })
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

  const handleDownloadExcel = async () => {
    try {
      const url = `/api/lead/manageSessions/viewStudents`;
      const params = {
        download: true,
        ...(selectedBranch && { branch: selectedBranch }),
        ...(selectedYear && { year: selectedYear }),
        ...(selectedCourse && { courseId: selectedCourse })
      };

      const response = await axios.get(url, { 
        params,
        responseType: 'blob'
      });

      // Create download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'students.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading Excel:', error);
      alert('Error downloading Excel file');
    }
  };

  return (
    <Dashboard>
      <div className="SortDataComponent">
        <div className="SortDataComponent-in">
          <div className="header-section">
            <h1>Student Data</h1>
            <button 
              onClick={handleDownloadExcel}
              className="download-btn"
            >
              Download Excel
            </button>
          </div>
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
                    <td>{student.year || 'N/A'}</td>
                    <td>{student.branch || 'N/A'}</td>
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

export default SortData;