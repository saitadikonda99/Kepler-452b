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

  const fetchCourses = async (yearId) => {
    try {
      const response = await axios.get(`/api/getCourses/clubCourses/${yearId}`);
      setCourses(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch courses");
    }
  };

  const fetchSessions = async (yearId, courseId) => {
    try {
      setIsLoading(true);
      let url = '/api/manageSessions/getSession';
      const params = new URLSearchParams();
      
      if (yearId) params.append('academicYearId', yearId);
      if (courseId) params.append('courseId', courseId);
      
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
        const activeSessionsOnly = sessionResponse.data.filter(session => session.is_active === 1);
        setSessionData(activeSessionsOnly);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch sessions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/academicYears");
        setAcademicYears(response.data);
        if (response.data.length > 0) {
          const defaultYear = response.data[0].id;
          setSelectedAcademicYear(defaultYear);
          await fetchCourses(defaultYear);
          fetchSessions(defaultYear, '');
        }
      } catch (error) {
        toast.error("Failed to load academic years");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedAcademicYear) {
      fetchCourses(selectedAcademicYear);
      setSelectedCourse(''); // Reset course selection when academic year changes
      fetchSessions(selectedAcademicYear, '');
    }
  }, [selectedAcademicYear]);

  useEffect(() => {
    if (selectedAcademicYear) {
      fetchSessions(selectedAcademicYear, selectedCourse);
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

  const handleTakeAttendance = (session) => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const attendanceResponse = await axios.get(
          `/api/manageSessions/takeAttendance?sessionId=${session.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (attendanceResponse.status === 200) {
          console.log("Raw attendance data:", attendanceResponse.data);
          const transformedData = attendanceResponse.data.map(student => ({
            ...student,
            attendance_status: student.attendance_status || 'Absent',
            extra_points: parseInt(student.extra_points) || 0
          }));
          console.log("Transformed data:", transformedData);
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
          console.log(`Changing attendance for ${userId}:`, {
            oldStatus: student.attendance_status,
            newStatus: newStatus
          });
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
        applyNegativePoints: applyNegativePoints,
        attendanceData: attendanceData.map((student) => ({
          username: student.username,
          present: student.attendance_status,
          extra_points: parseInt(student.extra_points) || 0
        }))
      };

      console.log("Submitting data:", submissionData);

      const response = await axios.post(
        '/api/manageSessions/takeAttendance',
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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
      // Create worksheet data
      const worksheetData = attendanceData.map(student => ({
        'Roll Number': student.username,
        'Name': student.name,
        'Course': student.course,
        'Branch': student.branch,
        'Session Name': student.session_name,
        'Attendance Status': student.present ? 'Present' : 'Absent',
        'Extra Points': student.extra_points || 0,
        'Last Updated': new Date(student.last_updated).toLocaleString()
      }));

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(worksheetData);

      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

      // Generate filename with session name and date
      const fileName = `${selectedSession?.session_name}_attendance_${new Date().toISOString().split('T')[0]}.xlsx`;

      // Save file
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
        `/api/manageSessions/takeAttendance?sessionId=${session.id}`,
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
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="course-select"
                >
                  <option value="">All Courses</option>
                  {courses.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.course_code} - {course.course_name}
                    </option>
                  ))}
                </select>
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
                      sessionData.map((session) => {
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
                        <td colSpan="7" className="no-data">No sessions found</td>
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
                      <th>Residency type</th>
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
                          <td>{student.residency}</td>
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