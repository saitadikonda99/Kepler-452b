"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dashboard from "../../dashboard/dashboard";
import "./page.css";
import Loader from "../../../../animation/Loading";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  const fetchClubs = async () => {
    try {
      const response = await axios.get("/api/admin/getClubDetails");
      setClubs(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch clubs");
    }
  };

  const fetchCourses = async (yearId, clubId) => {
    try {
      if (!yearId) return;
      const url = clubId && clubId !== 'all'
        ? `/api/admin/manageSessions/clubCourses/${yearId}?clubId=${clubId}`
        : `/api/admin/manageSessions/clubCourses/${yearId}`;
      const response = await axios.get(url);
      setCourses(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch courses");
    }
  };

  const fetchSessions = async (yearId, courseId) => {
    try {
      setIsLoading(true);
      let url = '/api/admin/manageSessions/getSession';
      const params = new URLSearchParams();
      
      if (yearId) params.append('academicYearId', yearId);
      if (courseId && courseId !== 'all') params.append('courseId', courseId);
      if (selectedClub && selectedClub !== 'all') params.append('clubId', selectedClub);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const sessionResponse = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (sessionResponse.status === 200) {
        setSessions(sessionResponse.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch sessions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [academicYearsResponse] = await Promise.all([
          axios.get("/api/academicYears"),
          fetchClubs()
        ]);
        
        setAcademicYears(academicYearsResponse.data);
        if (academicYearsResponse.data.length > 0) {
          const defaultYear = academicYearsResponse.data[0].id;
          setSelectedAcademicYear(defaultYear);
          setSelectedClub('all');
        }
      } catch (error) {
        toast.error("Failed to load initial data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedAcademicYear) {
      fetchCourses(selectedAcademicYear, selectedClub === 'all' ? null : selectedClub);
      setSelectedCourse('all');
    }
  }, [selectedAcademicYear, selectedClub]);

  useEffect(() => {
    if (selectedAcademicYear) {
      fetchSessions(selectedAcademicYear, selectedCourse === 'all' ? null : selectedCourse);
    }
  }, [selectedCourse]);

  useEffect(() => {
    // Filter sessions based on search query
    const filtered = sessions.filter(session => {
      const searchLower = searchQuery.toLowerCase();
      return (
        session.session_name.toLowerCase().includes(searchLower) ||
        session.session_type.toLowerCase().includes(searchLower) ||
        session.session_venue.toLowerCase().includes(searchLower)
      );
    });
    setFilteredSessions(filtered);
  }, [searchQuery, sessions]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleApproveSession = async (sessionId) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/admin/manageSessions/updateSession', {
        sessionId,
        isActive: true
      });
      
      if (response.status === 200) {
        toast.success("Session approved successfully");
        // Refresh sessions list
        fetchSessions(selectedAcademicYear, selectedCourse);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve session");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/admin/manageSessions/updateSession?sessionId=${sessionId}`);
      
      if (response.status === 200) {
        toast.success("Session deleted successfully");
        // Refresh sessions list
        fetchSessions(selectedAcademicYear, selectedCourse);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete session");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dashboard>
      <div className="approveSessionsComponent">
        <div className="header-section">
          <h1>Approve Sessions</h1>
          <div className="filter-section">
            <select 
              value={selectedAcademicYear}
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
              className="academic-year-select"
            >
              <option value="">Select Academic Year</option>
              {academicYears.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.year_range} {"->"} {year.semester}
                </option>
              ))}
            </select>

            <select 
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="club-select"
            >
              <option value="all">All Clubs</option>
              {clubs.map((club) => (
                <option key={club.club_id} value={club.club_id}>
                  {club.club_name}
                </option>
              ))}
            </select>
            
            <select 
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="course-select"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_code} - {course.course_name}
                </option>
              ))}
            </select>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Points</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session, index) => (
                <tr key={session.id}>
                  <td>{index + 1}</td>
                  <td>{session.session_name}</td>
                  <td>{session.session_type}</td>
                  <td>{formatDate(session.session_date)}</td>
                  <td>{`${formatTime(session.session_sTime)} - ${formatTime(session.session_eTime)}`}</td>
                  <td>{session.session_venue}</td>
                  <td>{`+${session.session_points}/-${session.session_neg_points}`}</td>
                  <td>{session.is_active ? "Approved" : "Pending"}</td>
                  <td className="action-buttons">
                    {!session.is_active && (
                      <button
                        onClick={() => handleApproveSession(session.id)}
                        className="ApproveButton"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteSession(session.id)}
                      className="DeleteButton"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSessions.length === 0 && (
                <tr>
                  <td colSpan="9" className="no-data">
                    {searchQuery ? "No matching sessions found" : "No sessions found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Dashboard>
  );
};

export default page;
