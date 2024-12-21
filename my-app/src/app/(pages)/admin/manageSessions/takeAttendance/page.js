"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dashboard from "../../dashboard/dashboard";
import "./page.css";
import Loader from "../../../../animation/Loading";
import * as XLSX from 'xlsx';

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [applyNegativePoints, setApplyNegativePoints] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
      if (courseId) params.append('courseId', courseId);
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
        setSessionData(sessionResponse.data);
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

  const isSessionStarted = (sessionDate, sessionStartTime) => {
    const now = new Date();
    const sessionDateTime = new Date(sessionDate);
    const [hours, minutes] = sessionStartTime.split(':');
    
    sessionDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    return now >= sessionDateTime;
  };

  const [sessionId, setSessionId] = useState(null);

  const handleTakeAttendance = (session) => {
    setSessionId(session);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const attendanceResponse = await axios.get(
          `/api/admin/manageSessions/takeAttendance?sessionId=${session.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (attendanceResponse.status === 200) {
          const transformedData = attendanceResponse.data.map(student => ({
            ...student,
            attendance_status: student.attendance_status || 'Absent',
            extra_points: parseInt(student.extra_points) || 0
          }));
          setAttendanceData(transformedData);
          setSelectedSession(session);
          setShowAttendance(true);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch attendance data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  const handleCheckboxChange = (userId) => {
    setAttendanceData(prevData => {
      return prevData.map(student => {
        if (student.username === userId) {
          const newStatus = student.attendance_status === 'Present' ? 'Absent' : 'Present';
          return {
            ...student,
            attendance_status: newStatus
          };
        }
        return student;
      });
    });
  };

  const handleExtraPointsChange = (userId, points) => {
    setAttendanceData(prevData =>
      prevData.map(student =>
        student.username === userId
          ? { ...student, extra_points: points }
          : student
      )
    );
  };

  const handleBack = () => {
    setShowAttendance(false);
    setSelectedSession(null);
    setAttendanceData([]);
  };

  const handleNegativePointsToggle = () => {
    setApplyNegativePoints(!applyNegativePoints);
  };

  const handleSubmitAttendance = async () => {
    try {
      setIsLoading(true);
      
      const submissionData = {
        sessionId: selectedSession.id,
        clubId: selectedClub,
        applyNegativePoints: applyNegativePoints,
        attendanceData: attendanceData.map((student) => ({
          username: student.username,
          present: student.attendance_status,
          extra_points: parseInt(student.extra_points) || 0
        }))
      };

      const response = await axios.post(
        `/api/admin/manageSessions/takeAttendance`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response)

      if (response.status === 200) {
        toast.success("Attendance submitted successfully");
        handleBack();
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit attendance");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportToExcel = () => {
    try {
      const worksheetData = attendanceData.map(student => ({
        'Roll Number': student.username,
        'Name': student.name,
        'Course': student.course,
        'Branch': student.branch,
        'Session Name': student.session_name,
        'Attendance Status': student.attendance_status,
        'Extra Points': student.extra_points || 0,
        'Last Updated': new Date(student.last_updated).toLocaleString()
      }));

      const ws = XLSX.utils.json_to_sheet(worksheetData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

      const fileName = `${selectedSession?.session_name}_attendance_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);
      toast.success('Attendance data exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export attendance data');
    }
  };

  const handleDownloadAttendance = async (session) => {
    try {
      setIsLoading(true);
      const attendanceResponse = await axios.get(
        `/api/admin/manageSessions/takeAttendance?sessionId=${session.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (attendanceResponse.status === 200) {
        const transformedData = attendanceResponse.data.map(student => ({
          'Roll Number': student.username,
          'Name': student.name,
          'Course': student.course,
          'Branch': student.branch,
          'Session Name': student.session_name,
          'Attendance Status': student.attendance_status || 'Absent',
          'Extra Points': parseInt(student.extra_points) || 0,
          'Last Updated': new Date(student.last_updated).toLocaleString()
        }));

        const ws = XLSX.utils.json_to_sheet(transformedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        const fileName = `${session.session_name}_attendance_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
        toast.success('Attendance data exported successfully');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export attendance data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dashboard>
      <div className="takeAttendanceComponent">
        {!showAttendance ? (
          <>
            <div className="header-section">
              <h1>Take Attendance</h1>
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
                  className="academic-year-select"
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
              <div className="sessionTable">
                <table>
                  <thead>
                    <tr>
                      <th>Session Name</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Venue</th>
                      <th>Points</th>
                      <th>Last Updated</th>
                      <th>Action</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionData.length > 0 ? (
                      sessionData
                        .filter(session => {
                          if (!searchQuery) return true;
                          const searchLower = searchQuery.toLowerCase();
                          return (
                            session.session_name.toLowerCase().includes(searchLower) ||
                            session.session_type.toLowerCase().includes(searchLower) ||
                            session.session_venue.toLowerCase().includes(searchLower)
                          );
                        })
                        .map((session) => {
                          const started = isSessionStarted(session.session_date, session.session_sTime);
                          return (
                            <tr key={session.id}>
                              <td>{session.session_name}</td>
                              <td>{session.session_type}</td>
                              <td>{formatDate(session.session_date)}</td>
                              <td>
                                {formatTime(session.session_sTime)} - {formatTime(session.session_eTime)}
                              </td>
                              <td>{session.session_venue}</td>
                              <td>+{session.session_points} / -{session.session_neg_points}</td>
                              <td>{formatDate(session.updated_at)}</td>
                              <td>
                                <button 
                                  className={`take-btn ${!started ? 'disabled' : ''}`}
                                  disabled={!started}
                                  title={!started ? "Session hasn't started yet" : "Take attendance"}
                                  onClick={() => handleTakeAttendance(session)}
                                >
                                  Take Attendance
                                </button>
                              </td>
                              <td>
                                <button 
                                  className="download-btn"
                                  onClick={() => handleDownloadAttendance(session)}
                                >
                                  Download
                                </button>
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td colSpan="8" className="no-data">No sessions found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="attendance-header">
              <h1>Take Attendance - {selectedSession?.session_name}</h1>
              <div className="attendance-controls">
                <label className="negative-points-toggle">
                  <input 
                    type="checkbox" 
                    checked={applyNegativePoints}
                    onChange={handleNegativePointsToggle}
                  />
                  Apply Negative Points for Absent Students
                </label>
                {attendanceData.length > 0 && (
                  <button 
                    className="export-btn"
                    onClick={handleExportToExcel}
                  >
                    Download Excel
                  </button>
                )}
                <button className="back-btn" onClick={handleBack}>
                  ← Back to Sessions
                </button>
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="attendanceTable">
                <table>
                  <thead>
                    <tr>
                      <th>Roll Number</th>
                      <th>Name</th>
                      <th>Branch</th>
                      <th>Course</th>
                      <th>Session Name</th>
                      <th>Present</th>
                      <th>Extra Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.length > 0 ? (
                      attendanceData.map((student) => (
                        <tr key={student.username}>
                          <td>{student.username}</td>
                          <td>{student.name}</td>
                          <td>{student.branch}</td>
                          <td>{student.course}</td>
                          <td>{student.session_name}</td>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={student.attendance_status === 'Present'}
                              onChange={() => handleCheckboxChange(student.username)}
                            />
                          </td>
                          <td>
                            <input 
                              type="number"
                              value={student.extra_points}
                              onChange={(e) => handleExtraPointsChange(student.username, parseInt(e.target.value) || 0)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-data">No students found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <button className="submit-btn" onClick={handleSubmitAttendance}>Submit</button>
              </div>
            )}
          </>
        )}
      </div>
    </Dashboard>
  );
};

export default page;