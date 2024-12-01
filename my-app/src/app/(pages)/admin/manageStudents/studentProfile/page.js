"use client"
import React, { useState, useEffect } from 'react';
import Dashboard from '../../dashboard/dashboard';
import './page.css';

import Loading from '../../../../animation/Loading';

const StudentProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/studentProfile?search=${searchTerm}`);
      const data = await response.json();
      setStudent(data.student);
      console.log(response);
    } catch (error) {
      console.error('Error fetching student:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      {loading && <Loading />}
      <div className="StudentProfileComponent">
        <div className="StudentProfileComponent-in">
          <h1>Student Profile</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search student by ID number or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {loading && <Loading />}
          {student === null && (
            <p>No student found</p>
          )}
          {student && (
            <div className="student-details">
              <p><strong>Name:</strong> {student.user_name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>ID Number:</strong> {student.id_number}</p>
              <p><strong>Branch:</strong> {student.branch}</p>
              <p><strong>Email ID:</strong> {student.email_id}</p>
              <p><strong>Gender:</strong> {student.gender}</p>
              <p><strong>Country Code:</strong> {student.country_code}</p>
              <p><strong>Phone Number:</strong> {student.phone_number}</p>
              <p><strong>Residency:</strong> {student.residency}</p>
              <p><strong>Hostel Name:</strong> {student.hostel_name}</p>
              <p><strong>Bus Route:</strong> {student.bus_route}</p>
              <p><strong>Country:</strong> {student.country}</p>
              <p><strong>State:</strong> {student.state}</p>
              <p><strong>District:</strong> {student.district}</p>
              <p><strong>Pincode:</strong> {student.pincode}</p>
              <p><strong>Domain:</strong> {student.domain}</p>
              <p><strong>ERP Reference Number:</strong> {student.erp_reference_number}</p>
              <p><strong>Payment Status:</strong> {student.payment_status}</p>
              <p><strong>Registration Date:</strong> {student.registration_date}</p>
              <p><strong>Club:</strong> {student.club_name}</p>
              <div>
                <h3>Registered Courses:</h3>
                {student.course_id ? (
                  <ul>
                    <li>
                      <strong>Course Code:</strong> {student.course_code}
                    </li>
                    <li>
                      <strong>Course Name:</strong> {student.course_name}
                    </li>
                    <li>
                      <strong>Course Level:</strong> {student.course_level}
                    </li>
                    <li>
                      <strong>Academic Year:</strong> {student.year_range}
                    </li>
                    <li>
                      <strong>Semester:</strong> {student.semester}
                    </li>
                  </ul>
                ) : (
                  <p>No registered courses found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default StudentProfile;