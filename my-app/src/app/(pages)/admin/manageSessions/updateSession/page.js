"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dashboard from "../../dashboard/dashboard";
import "./page.css";
import Loader from "../../../../animation/Loading";

const UpdateSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [resourcePersonInput, setResourcePersonInput] = useState('');
  const [inChargeInput, setInChargeInput] = useState('');
  const [selectedInCharges, setSelectedInCharges] = useState([]);
  const [resourcePersonExists, setResourcePersonExists] = useState(false);

  const [updatedSessionData, setUpdatedSessionData] = useState({
    id: null,
    sessionName: "",
    sessionType: "",
    sessionDate: "",
    sessionSTime: "",
    sessionETime: "",
    sessionVenue: "",
    sessionPoints: 0,
    sessionNegPoints: 0,
    sessionResourcePerson: "",
    sessionInCharges: []
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/admin/manageSessions/getSession");
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

  const handleEdit = (session) => {
    setShowEdit(true);
    setUpdatedSessionData({
      id: session.id,
      sessionName: session.session_name,
      sessionType: session.session_type,
      sessionDate: session.session_date.split('T')[0],
      sessionSTime: session.session_sTime,
      sessionETime: session.session_eTime,
      sessionVenue: session.session_venue,
      sessionPoints: session.session_points,
      sessionNegPoints: session.session_neg_points,
      sessionResourcePerson: session.session_resource_person,
      sessionInCharges: []
    });
    setResourcePersonInput(session.resource_person_name || '');
    setResourcePersonExists(true);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put("/api/admin/manageSessions/update", updatedSessionData);
      
      if (response.status === 200) {
        toast.success("Session updated successfully");
        setShowEdit(false);
        // Refresh sessions list
        const refreshResponse = await axios.get("/api/admin/manageSessions/getSession");
        setSessions(refreshResponse.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update session");
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

  // Rest of the component implementation similar to lead's updateSession
  // Including handleUserSearch, handleUserSelect, handleRemoveInCharge functions

  return (
    <Dashboard>
      <div className="updateSessionComponent">
        <div className="updateSessionComponent-in">
          {isLoading ? (
            <Loader />
          ) : showEdit ? (
            <div className="edit-form">
              {/* Edit form implementation similar to lead's version */}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Club</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                  <th>Points</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
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
                        onClick={() => handleEdit(session)}
                        className="EditButton"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default UpdateSession; 