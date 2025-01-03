"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dashboard from "../../dashboard/dashboard";
import "./page.css";
import Loader from "../../../../animation/Loading";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

const page = () => {
   
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [inChargeInput, setInChargeInput] = useState('');
  const [resourcePersonInput, setResourcePersonInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [selectedInCharges, setSelectedInCharges] = useState([]);
  const [resourcePersonExists, setResourcePersonExists] = useState(false);

  const [sessionData, setSessionData] = useState({
     sessionName: "",
     sessionType: "",
     sessionDate: "",
     sessionStartTime: "",
     sessionEndTime: "",
     sessionVenue: "",
     academicYearId: "",
     sessionCourseId: "",
     sessionPoints: "",
     sessionNegPoints: "",
     sessionFor: "all",
     sessionResourcePerson: "",
     sessionInCharges: [],
  });

  console.log(sessionData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sessionInCharges') {
      setInChargeInput(value);
    } else {
      setSessionData({ ...sessionData, [name]: value });
    }

  };

  const handleAddInCharge = () => {
    if (inChargeInput.trim() && !sessionData.sessionInCharges.includes(inChargeInput.trim())) {
      setSessionData({
        ...sessionData,
        sessionInCharges: [...sessionData.sessionInCharges, inChargeInput.trim()]
      });
      setInChargeInput('');
    } else {
      toast.error("Please provide a valid and unique In-Charge ID");
    }
  };

  const handleRemoveInCharge = (indexToRemove) => {
    setSessionData({
      ...sessionData,
      sessionInCharges: sessionData.sessionInCharges.filter((_, index) => index !== indexToRemove)
    });
    setSelectedInCharges(selectedInCharges.filter((_, index) => index !== indexToRemove));
  };

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
      const response = await axios.get(`/api/users/search?query=${value}`, {
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

  const [academicYears, setAcademicYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/academicYears");
        setAcademicYears(response.data);
      } catch (error) {
        toast.error("Failed to load academic years");
      }
    };
    fetchData();
  }, []);

  const handleUserSelect = (user) => {
    if (activeField === 'resource') {
      setSessionData({
        ...sessionData,
        sessionResourcePerson: user.id
      });
      setResourcePersonInput(user.name + " - " + user.username);
      setResourcePersonExists(true);
    } else {
      if (!sessionData.sessionInCharges.includes(user.id)) {
        setSessionData({
          ...sessionData,
          sessionInCharges: [...sessionData.sessionInCharges, user.id]
        });
        setSelectedInCharges([...selectedInCharges, { id: user.id, name: user.name }]);
      }
      setInChargeInput('');
    }
    setSearchResults([]);
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (sessionData.academicYearId) {
        try {
          const courseResponse = await axios.get(
            `/api/getCourses/clubCourses/${sessionData.academicYearId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          console.log(courseResponse);
          if (courseResponse.status === 200) {
            setCourseData(courseResponse.data);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            toast.error("Failed to fetch courses");
          }
        } catch (error) {
          setIsLoading(false);
          toast.error("Failed to fetch courses");
        }
      }
    };
    
    fetchData();
  }, [sessionData.academicYearId]);

  const validateForm = () => {
    if (!resourcePersonExists) {
      toast.error("Please select a valid resource person from the suggestions");
      return false;
    }

    if (sessionData.sessionInCharges.length === 0) {
      toast.error("Please add at least one in-charge");
      return false;
    }

    if (!sessionData.sessionName.trim()) {
      toast.error("Session name is required");
      return false;
    }

    if (!sessionData.sessionType) {
      toast.error("Please select a session type");
      return false;
    }

    if (!sessionData.sessionDate) {
      toast.error("Session date is required");
      return false;
    }

    if (!sessionData.sessionStartTime || !sessionData.sessionEndTime) {
      toast.error("Session time is required");
      return false;
    }

    if (!sessionData.sessionVenue.trim()) {
      toast.error("Session venue is required");
      return false;
    }

    if (!sessionData.sessionCourseId) {
      toast.error("Please select a course");
      return false;
    }

    if (!sessionData.sessionPoints || sessionData.sessionPoints <= 0) {
      toast.error("Please enter valid session points");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `/api/manageSessions/add`,
        sessionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Session added successfully");
        setSessionData({
          academicYearId: "",
          sessionName: "",
          sessionType: "",
          sessionDate: "",
          sessionStartTime: "",
          sessionEndTime: "",
          sessionVenue: "",
          sessionCourseId: "",
          sessionPoints: "",
          sessionResourcePerson: "",
          sessionInCharges: [],
        });
        setResourcePersonInput("");
        setSelectedInCharges([]);
        setResourcePersonExists(false);
      } else {
        toast.error("Failed to add session");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add session");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!resourcePersonInput) {
      setResourcePersonExists(false);
      setSessionData(prev => ({
        ...prev,
        sessionResourcePerson: ""
      }));
    }
  }, [resourcePersonInput]);

  return (
    <Dashboard>
        <div className="addSessionComponent">
            <div className="addSessionComponent-in">
                <div className="addSession-one">
                    <h1>Add Session</h1>
                </div>
                
                <div className="addSession-two">
                    <div className="ad-one">
                        <div className="ad-one-one">
                            <input 
                                type="text" 
                                name="sessionName"
                                placeholder="Session Name" 
                                value={sessionData.sessionName} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="ad-one-two">
                            <select 
                                name="sessionType"
                                id="sessionType"
                                value={sessionData.sessionType} 
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
                                value={sessionData.sessionDate} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="ad-two-two">
                            <input 
                                type="time" 
                                name="sessionStartTime"
                                value={sessionData.sessionStartTime} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="ad-two-three">
                            <input 
                                type="time" 
                                name="sessionEndTime"
                                value={sessionData.sessionEndTime} 
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
                              value={sessionData.sessionVenue} 
                              onChange={handleChange}
                          />
                        </div>
                        <div className="ad-three-two">
                              <select
                                  className="addCourse-select"
                                  name="academicYearId"
                                  onChange={handleChange}
                                  value={sessionData.academicYearId}
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
                                name="sessionCourseId"
                                id="sessionCourseId"
                                value={sessionData.sessionCourseId} 
                                onChange={handleChange}
                            >
                                <option value="">Select Course</option>
                                {courseData.map((course) => (
                                    <option key={course.id} value={course.course_id}>{course.course_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="ad-three-four">
                            <select 
                                name="sessionFor"
                                value={sessionData.sessionFor} 
                                onChange={handleChange}
                            >
                                <option value="all">All Students</option>
                                <option value="Hosteler">Hostellers Only</option>
                                <option value="Day Scholar">Day Scholars Only</option>
                            </select>
                        </div>
                    </div>
                    <div className="ad-four">
                        <div className="ad-four-one">
                            <input 
                                type="number" 
                                name="sessionPoints"
                                placeholder="Session Points" 
                                value={sessionData.sessionPoints} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="ad-four-two">
                            <input 
                                type="number" 
                                name="sessionNegPoints"
                                placeholder="Session Negative Points" 
                                value={sessionData.sessionNegPoints} 
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
                                        resourcePersonInput.length >= 2 && setShowDropdown(true);
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
                                                <span className="username">{user.username}</span>
                                                <span className="name">{user.name}</span>
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
                                            inChargeInput.length >= 2 && setShowDropdown(true);
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
                                                    <span className="username">{user.username} </span>
                                                    <span className="name">{user.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ad-five">
                        <button className="ad-five-btn" onClick={handleSubmit}>Submit</button>
                    </div>
                    {/* Display added in-charges */}
                    {sessionData.sessionInCharges.length > 0 && (
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
                </div>
            </div>
        </div>
    </Dashboard>
  );
};

export default page;
