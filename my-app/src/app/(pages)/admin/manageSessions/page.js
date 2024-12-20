"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dashboard from "../dashboard/dashboard";
import "./page.css";
import Loader from "../../../animation/Loading";

const AdminManageSessions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClub, setFilterClub] = useState("");
  const [uniqueClubs, setUniqueClubs] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [applyNegativePoints, setApplyNegativePoints] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/admin/manageSessions/getSession");
        setSessions(response.data);
        
        // Extract unique club names for filter dropdown
        const clubs = [...new Set(response.data.map(session => session.club_name))];
        setUniqueClubs(clubs);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch sessions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

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

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = 
      session.session_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.club_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.lead_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClub = filterClub ? session.club_name === filterClub : true;
    
    return matchesSearch && matchesClub;
  });

  const handleTakeAttendance = async (session) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/api/admin/manageSessions/takeAttendance?sessionId=${session.id}`
      );
      
      if (response.status === 200) {
        const transformedData = response.data.map(student => ({
          ...student,
          present: student.present === 1 || student.present === true || student.present === 'Present',
          extra_points: student.extra_points || 0
        }));
        setAttendanceData(transformedData);
        setSelectedSession(session);
        setShowAttendance(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch attendance data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (userId) => {
    setAttendanceData(prevData =>
      prevData.map(student =>
        student.username === userId
          ? { ...student, present: !student.present }
          : student
      )
    );
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

  const handleSubmitAttendance = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `/api/admin/manageSessions/takeAttendance`,
        {
          sessionId: selectedSession.id,
          applyNegativePoints,
          attendanceData: attendanceData.map(student => ({
            username: student.username,
            present: student.present,
            extra_points: student.extra_points || 0,
          }))
        }
      );

      if (response.status === 200) {
        toast.success("Attendance submitted successfully");
        setShowAttendance(false);
        setSelectedSession(null);
        setAttendanceData([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit attendance");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowAttendance(false);
    setSelectedSession(null);
    setAttendanceData([]);
  };

  return (
    <Dashboard>
      <div className="manageSessionsComponent">
        <div className="manageSessionsComponent-in">
          {!showAttendance ? (
            <>
              <div className="sessions-header">
                <h1>All Sessions</h1>
                <div className="filter-controls">
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <select
                    value={filterClub}
                    onChange={(e) => setFilterClub(e.target.value)}
                    className="club-filter"
                  >
                    <option value="">All Clubs</option>
                    {uniqueClubs.map(club => (
                      <option key={club} value={club}>{club}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <Loader />
              ) : (
                <div className="sessions-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Session Name</th>
                        <th>Club</th>
                        <th>Lead</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Venue</th>
                        <th>Points</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSessions.length > 0 ? (
                        filteredSessions.map((session) => (
                          <tr key={session.id}>
                            <td>{session.session_name}</td>
                            <td>{session.club_name}</td>
                            <td>{`${session.lead_name} (${session.lead_username})`}</td>
                            <td>{session.session_type}</td>
                            <td>{formatDate(session.session_date)}</td>
                            <td>{`${formatTime(session.session_sTime)} - ${formatTime(session.session_eTime)}`}</td>
                            <td>{session.session_venue}</td>
                            <td>{`+${session.session_points}/-${session.session_neg_points}`}</td>
                            <td className="action-buttons">
                              <button
                                onClick={() => handleTakeAttendance(session)}
                                className="action-btn attendance-btn"
                              >
                                Take Attendance
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="no-data">No sessions found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="attendance-section">
              <div className="attendance-header">
                <h2>Take Attendance - {selectedSession?.session_name}</h2>
                <div className="attendance-controls">
                  <label className="negative-points-toggle">
                    <input 
                      type="checkbox" 
                      checked={applyNegativePoints}
                      onChange={() => setApplyNegativePoints(!applyNegativePoints)}
                    />
                    Apply Negative Points for Absent Students
                  </label>
                  <button onClick={handleBack} className="back-btn">
                    ← Back to Sessions
                  </button>
                </div>
              </div>

              {isLoading ? (
                <Loader />
              ) : (
                <div className="attendance-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Roll Number</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Branch</th>
                        <th>Present</th>
                        <th>Extra Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((student) => (
                        <tr key={student.username}>
                          <td>{student.username}</td>
                          <td>{student.name}</td>
                          <td>{student.course}</td>
                          <td>{student.branch}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={student.present}
                              onChange={() => handleCheckboxChange(student.username)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={student.extra_points}
                              onChange={(e) => handleExtraPointsChange(student.username, parseInt(e.target.value) || 0)}
                              className="extra-points-input"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="attendance-actions">
                    <button onClick={handleSubmitAttendance} className="submit-btn">
                      Submit Attendance
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default AdminManageSessions; 