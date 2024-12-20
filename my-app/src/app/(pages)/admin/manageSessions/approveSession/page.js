"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dashboard from "../../dashboard/dashboard";
import "./page.css";
import Loader from "../../../../animation/Loading";

const ApproveSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
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
        const response = await axios.get("/api/admin/manageSessions/approve");
        setSessions(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch sessions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleApprove = async (sessionId, approved) => {
    try {
      setIsLoading(true);
      const response = await axios.put("/api/admin/manageSessions/approve", {
        sessionId,
        approved
      });

      if (response.status === 200) {
        toast.success(approved ? "Session approved" : "Session rejected");
        // Refresh the sessions list
        const refreshResponse = await axios.get("/api/admin/manageSessions/approve");
        setSessions(refreshResponse.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update session status");
    } finally {
      setIsLoading(false);
    }
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
    ? sessions.filter(session => session.session_club_id === parseInt(selectedClub))
    : sessions;

  return (
    <Dashboard>
      <div className="approveSessionComponent">
        <div className="approveSessionComponent-in">
          <div className="header">
            <h1>Approve Sessions</h1>
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
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="sessions-table">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Club</th>
                    <th>Session Name</th>
                    <th>Course</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Venue</th>
                    <th>Points</th>
                    <th>Lead</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions.map((session, index) => (
                    <tr key={session.id}>
                      <td>{index + 1}</td>
                      <td>{session.club_name}</td>
                      <td>{session.session_name}</td>
                      <td>{session.course_name}</td>
                      <td>{session.session_type}</td>
                      <td>{formatDate(session.session_date)}</td>
                      <td>{`${formatTime(session.session_sTime)} - ${formatTime(session.session_eTime)}`}</td>
                      <td>{session.session_venue}</td>
                      <td>{`+${session.session_points}/-${session.session_neg_points}`}</td>
                      <td>{`${session.lead_name} (${session.lead_username})`}</td>
                      <td className="action-buttons">
                        <button
                          onClick={() => handleApprove(session.id, true)}
                          className="approve-btn"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApprove(session.id, false)}
                          className="reject-btn"
                        >
                          Reject
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

export default ApproveSession; 