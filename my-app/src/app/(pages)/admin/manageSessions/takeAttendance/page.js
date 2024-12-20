"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dashboard from "../../dashboard/dashboard";
import "./page.css";
import Loader from "../../../../animation/Loading";

const TakeAttendance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [applyNegativePoints, setApplyNegativePoints] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("/api/clubs/getClubs");
        setClubs(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch clubs");
      }
    };
    fetchClubs();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/admin/manageSessions/getSession");
        setSessionData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch sessions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

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
      const response = await axios.post("/api/admin/manageSessions/takeAttendance", {
        sessionId: selectedSession.id,
        attendanceData,
        applyNegativePoints
      });

      if (response.status === 200) {
        toast.success("Attendance updated successfully");
        setShowAttendance(false);
        setSelectedSession(null);
        setAttendanceData([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update attendance");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowAttendance(false);
    setSelectedSession(null);
    setAttendanceData([]);
  };

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

  const filteredSessions = selectedClub
    ? sessionData.filter(session => session.session_club_id === parseInt(selectedClub))
    : sessionData;

  return (
    <Dashboard>
      <div className="takeAttendanceComponent">
        <div className="takeAttendanceComponent-in">
          {!showAttendance && (
            <div className="club-filter">
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="club-select"
              >
                <option value="">All Clubs</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.club_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {isLoading ? (
            <Loader />
          ) : showAttendance ? (
            <div className="attendance-section">
              <div className="attendance-header">
                <h2>{selectedSession.session_name}</h2>
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
            </div>
          ) : (
            <div className="sessions-list">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Club</th>
                    <th>Session Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Venue</th>
                    <th>Points</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions.map((session, index) => (
                    <tr key={session.id}>
                      <td>{index + 1}</td>
                      <td>{session.club_name}</td>
                      <td>{session.session_name}</td>
                      <td>{session.session_type}</td>
                      <td>{formatDate(session.session_date)}</td>
                      <td>{`${formatTime(session.session_sTime)} - ${formatTime(session.session_eTime)}`}</td>
                      <td>{session.session_venue}</td>
                      <td>{`+${session.session_points}/-${session.session_neg_points}`}</td>
                      <td>
                        <button
                          onClick={() => handleTakeAttendance(session)}
                          className="take-attendance-btn"
                        >
                          Take Attendance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default TakeAttendance; 