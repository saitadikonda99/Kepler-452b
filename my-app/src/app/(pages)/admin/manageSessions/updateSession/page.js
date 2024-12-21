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
  const [showEdit, setShowEdit] = useState(false);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [resourcePersonInput, setResourcePersonInput] = useState('');
  const [inChargeInput, setInChargeInput] = useState('');
  const [selectedInCharges, setSelectedInCharges] = useState([]);
  const [resourcePersonExists, setResourcePersonExists] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const [updatedSessionData, setUpdatedSessionData] = useState({
    id: null,
    sessionName: "",
    sessionType: "",
    sessionDate: "",
    sessionSTime: "",
    sessionETime: "",
    sessionVenue: "",
    academicYearId: "",
    clubId: "",
    sessionCourseId: "",
    sessionPoints: "",
    sessionNegPoints: "",
    sessionResourcePerson: "",
    sessionInCharges: []
  });

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
      if (courseId && courseId !== '') params.append('courseId', courseId);
      if (selectedClub && selectedClub !== 'all') params.append('clubId', selectedClub);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setSessions(response.data);
        setFilteredSessions(response.data);
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
  }, [selectedCourse, selectedClub]);

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

  useEffect(() => {
    const fetchData = async () => {
      if (updatedSessionData.academicYearId && updatedSessionData.clubId) {
        try {
          setIsLoading(true);
          const courseResponse = await axios.get(
            `/api/getCourses/club/${updatedSessionData.clubId}/year/${updatedSessionData.academicYearId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          if (courseResponse.status === 200) {
            setCourseData(courseResponse.data);
          } else {
            toast.error("Failed to fetch courses");
          }
        } catch (error) {
          console.error("Error fetching courses:", error);
          toast.error("Failed to fetch courses. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setCourseData([]);
      }
    };
    
    fetchData();
  }, [updatedSessionData.academicYearId, updatedSessionData.clubId]);

  const handleEdit = (session) => {
    console.log("Session data:", session);
    setShowEdit(true);
    
    setUpdatedSessionData({
      id: session.id,
      sessionName: session.session_name,
      sessionType: session.session_type,
      sessionDate: session.session_date,
      sessionSTime: session.session_sTime,
      sessionETime: session.session_eTime,
      sessionVenue: session.session_venue,
      academicYearId: session.academic_year_id,
      clubId: session.session_club_id,
      sessionCourseId: session.session_course_id,
      sessionPoints: session.session_points,
      sessionNegPoints: session.session_neg_points,
      sessionResourcePerson: session.session_resource_person,
      sessionInCharges: session.inCharges ? session.inCharges.map(ic => ic.user_id) : []
    });

    // Set resource person input with name and username
    setResourcePersonInput(
      session.resource_person_name && session.resource_person_username
        ? `${session.resource_person_name} (${session.resource_person_username})`
        : ""
    );
    
    // Map the in-charges with their full information
    const mappedInCharges = session.inCharges ? session.inCharges.map(inCharge => ({
      id: inCharge.user_id,
      name: `${inCharge.name} (${inCharge.username})`
    })) : [];
    
    console.log("Mapped in-charges:", mappedInCharges);
    setSelectedInCharges(mappedInCharges);
    setResourcePersonExists(!!session.session_resource_person);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'clubId' || name === 'academicYearId') {
      setUpdatedSessionData({ 
        ...updatedSessionData, 
        [name]: value,
        sessionCourseId: "" // Reset course selection when club or academic year changes
      });
    } else {
      setUpdatedSessionData({
        ...updatedSessionData,
        [name]: value
      });
    }
  };

  console.log(updatedSessionData);

  const handleUserSearch = async (value, field) => {
    if (field === 'resource') {
      setResourcePersonInput(value);
    } else {
      setInChargeInput(value);
    }
    setActiveField(field);
    
    if (value.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await axios.get(`/api/users/search/${updatedSessionData.clubId}?query=${value}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setSearchResults(response.data.users);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleUserSelect = (user) => {
    if (activeField === 'resource') {
      setUpdatedSessionData({
        ...updatedSessionData,
        sessionResourcePerson: user.id
      });
      setResourcePersonInput(`${user.name} (${user.username})`);
      setResourcePersonExists(true);
    } else {
      if (!updatedSessionData.sessionInCharges.includes(user.id)) {
        setUpdatedSessionData({
          ...updatedSessionData,
          sessionInCharges: [...updatedSessionData.sessionInCharges, user.id]
        });
        setSelectedInCharges([...selectedInCharges, { 
          id: user.id, 
          name: `${user.name} (${user.username})`
        }]);
      }
      setInChargeInput('');
    }
    setSearchResults([]);
    setShowDropdown(false);
  };

  const handleRemoveInCharge = (indexToRemove) => {
    setUpdatedSessionData({
      ...updatedSessionData,
      sessionInCharges: updatedSessionData.sessionInCharges.filter((_, index) => index !== indexToRemove)
    });
    setSelectedInCharges(selectedInCharges.filter((_, index) => index !== indexToRemove));
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `/api/admin/manageSessions/updateSession`,
        updatedSessionData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        toast.success("Session updated successfully");
        setSessions(prev => 
          prev.map(session => 
            session.id === updatedSessionData.id ? 
            {...session, ...updatedSessionData} : 
            session
          )
        );
        setShowEdit(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update session");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowEdit(false);
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

  return (
    <Dashboard>
      <div className="addSessionComponent">
        <div className="addSessionComponent-in">
          <div className="addSession-one">
            <div className="header-section">
              <h1>Update Session</h1>
              {!showEdit && (
                <div className="filter-section">
                  <div className="filter-row">
                    <select 
                      value={selectedAcademicYear}
                      onChange={(e) => setSelectedAcademicYear(e.target.value)}
                      className="filter-select"
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
                      className="filter-select"
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
                      className="filter-select"
                    >
                      <option value="all">All Courses</option>
                      {courses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                          {course.course_code} - {course.course_name}
                        </option>
                      ))}
                    </select>

                    <div className="search-box">
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
              )}
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : showEdit ? (
            <div className="addSession-two">
              <div className="ad-one">
                <div className="ad-one-one">
                  <input
                    type="text"
                    name="sessionName"
                    placeholder="Session Name"
                    value={updatedSessionData.sessionName}
                    onChange={handleChange}
                  />
                </div>
                <div className="ad-one-two">
                  <select
                    name="sessionType"
                    id="sessionType"
                    value={updatedSessionData.sessionType}
                    onChange={handleChange}
                  >
                    <option value="">Select Session Type</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Practice">Practice</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
              </div>
              <div className="ad-two">
                <div className="ad-two-one">
                  <input
                    type="date"
                    name="sessionDate"
                    value={updatedSessionData.sessionDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="ad-two-two">
                  <input
                    type="time"
                    name="sessionSTime"
                    value={updatedSessionData.sessionSTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="ad-two-three">
                  <input
                    type="time"
                    name="sessionETime"
                    value={updatedSessionData.sessionETime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="ad-three">
                <div className="ad-three-one">
                  <input
                    type="text"
                    name="sessionVenue"
                    placeholder="Session Venue"
                    value={updatedSessionData.sessionVenue}
                    onChange={handleChange}
                  />
                </div>
                <div className="ad-three-two">
                  <select
                    className="addCourse-select"
                    name="academicYearId"
                    onChange={handleChange}
                    value={updatedSessionData.academicYearId}
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((academicYear) => (
                      <option key={academicYear.id} value={academicYear.id}>
                        {academicYear.year_range} {"->"} {academicYear.semester}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ad-three-three">
                  <select
                    className="addCourse-select"
                    name="clubId"
                    onChange={handleChange}
                    value={updatedSessionData.clubId}
                  >
                    <option value="">Select Club</option>
                    {clubs.map((club) => (
                      <option key={club.club_id} value={club.club_id}>
                        {club.club_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="ad-three">
                <div className="ad-three-one">
                  <select
                    name="sessionCourseId"
                    id="sessionCourseId"
                    value={updatedSessionData.sessionCourseId}
                    onChange={handleChange}
                    disabled={!updatedSessionData.academicYearId || !updatedSessionData.clubId}
                  >
                    <option value="">Select Course</option>
                    {courseData && courseData.map((course) => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_name} ({course.course_code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="ad-four">
                <div className="ad-four-one">
                  <input
                    type="number"
                    name="sessionPoints"
                    placeholder="Session Points"
                    value={updatedSessionData.sessionPoints}
                    onChange={handleChange}
                  />
                </div>
                <div className="ad-four-two">
                  <input
                    type="number"
                    name="sessionNegPoints"
                    placeholder="Session Negative Points"
                    value={updatedSessionData.sessionNegPoints}
                    onChange={handleChange}
                  />
                </div>
                <div className="ad-four-three">
                  <div className="autocomplete-wrapper">
                    <input
                      type="text"
                      name="sessionResourcePerson"
                      placeholder="Search Resource Person"
                      value={resourcePersonInput}
                      onChange={(e) => handleUserSearch(e.target.value, 'resource')}
                      onFocus={() => {
                        setActiveField('resource');
                        if (resourcePersonInput.length >= 2) setShowDropdown(true);
                      }}
                    />
                    {showDropdown && activeField === 'resource' && searchResults.length > 0 && (
                      <div className="autocomplete-dropdown">
                        {searchResults.map((user) => (
                          <div
                            key={user.id}
                            className="autocomplete-item"
                            onClick={() => handleUserSelect(user)}
                          >
                            <div className="user-info">
                              <span className="username">{user.username}</span>
                              <span className="name">{user.name}</span>
                              <span className="role">{user.role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="ad-four-three">
                  <div className="incharge-input-container">
                    <div className="autocomplete-wrapper">
                      <input
                        type="text"
                        name="sessionInCharges"
                        placeholder="Search In-Charge"
                        value={inChargeInput}
                        onChange={(e) => handleUserSearch(e.target.value, 'incharge')}
                        onFocus={() => {
                          setActiveField('incharge');
                          if (inChargeInput.length >= 2) setShowDropdown(true);
                        }}
                      />
                      {showDropdown && activeField === 'incharge' && searchResults.length > 0 && (
                        <div className="autocomplete-dropdown">
                          {searchResults.map((user) => (
                            <div
                              key={user.id}
                              className="autocomplete-item"
                              onClick={() => handleUserSelect(user)}
                            >
                              <div className="user-info">
                                <span className="username">{user.username}</span>
                                <span className="name">{user.name}</span>
                                <span className="role">{user.role}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {selectedInCharges.length > 0 && (
                <div className="in-charge-list">
                  <h3>Added In-Charges:</h3>
                  <ul>
                    {selectedInCharges.map((inCharge, index) => (
                      <li key={index}>
                        <span>{inCharge.name}</span>
                        <button
                          onClick={() => handleRemoveInCharge(index)}
                          className="remove-incharge-btn"
                          type="button"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="ad-five">
                <button className="ad-five-btn" onClick={handleUpdate}>Update</button>
              </div>
            </div>
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
                  <th>Edit</th>
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
                {filteredSessions.length === 0 && (
                  <tr>
                    <td colSpan="8" className="no-data">
                      {searchQuery ? "No matching sessions found" : "No sessions found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
