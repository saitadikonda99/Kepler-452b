"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../sil/Navbar";
import Footer from '../components/footer/page'

import "./page.css";

import Loader from "../../animation/loader";

// import data files here
import { boyHostels, girlHostels, busRoutes } from "./residencyData/data";
import { countryCodes, countryNames } from "./countryData/data";
import { districtNames } from "./districtData/data";
import { branchNames } from "./branchData/data";

const Page = () => {
  const [clubData, setClubData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [registration, setRegistration] = useState([]);
  const [academicYearId, setAcademicYearId] = useState(null);
  const [data, setData] = useState({
    name: "",
    idNumber: "",
    email: "",
    branch: "",
    gender: "",
    countryCode: "",
    phoneNumber: "",
    year: "",
    residency: "",
    hostelName: "",
    busRoute: "",
    country: "",
    state: "",
    district: "",
    pinCode: "",
    domain: "",
    clubId: "",
    clubName: "",
    idCard: "",
    erpReferenceNumber: "",
    courseId: "",
    academicYearId: "",
    courseName: "",
    courseLevel: "",
  });

  const techClubs = useMemo(
    () => clubData.filter((club) => club.club_domain === "TEC" && club.active === 1),
    [clubData]
  );
  const lchClubs = useMemo(
    () => clubData.filter((club) => club.club_domain === "LCH" && club.active === 1),
    [clubData]
  );
  const esoClubs = useMemo(
    () => clubData.filter((club) => club.club_domain === "ESO" && club.active === 1),
    [clubData]
  );
  const hieClubs = useMemo(
    () => clubData.filter((club) => club.club_domain === "IIE" && club.active === 1),
    [clubData]
  );
  const hwbClubs = useMemo(
    () => clubData.filter((club) => club.club_domain === "HWB" && club.active === 1),
    [clubData]
  );

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!data.idCard || !data.erpReferenceNumber) {
        toast.error("Please fill all the fields");
        setIsLoading(false);
        return;
      }

      // Check file size limit of 2MB
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      if (data.idCard.size > maxSizeInBytes) {
        toast.error("File size exceeds the limit of 2MB");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'idCard') {
          formData.append(key, data[key], data[key].name);
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await axios.post("/api/clubRegistration", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoading(false);
        console.log(response);
        toast.success("Registration Successful");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  }, [data]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
  
    if (name === "idNumber") {
      setData({
        ...data,
        [name]: value,
        email: value + "@kluniversity.in",
      });
    } 
    else if (name === "clubName") {
      setData({
        ...data,
        [name]: value,
        clubId: clubData.find((club) => club.club_name === value)?.id,
        courseId: "",
        courseName: "",
        courseLevel: "",
      });
    }
    else if (name === "courseName") {
      setData({
        ...data,
        [name]: value,
        courseId: courseData.find((course) => course.course_name === value)?.id,
      });
    }
    else {
      setData({
        ...data,
        [name]: value,
      });
    }
  }, [data, clubData, courseData]);

  const handleFileChange = useCallback((e, name) => {
    const file = e.target.files[0];
    setData({
      ...data,
      [name]: file,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [registrationResponse, clubResponse] = await Promise.all([
          axios.get("/api/admin/manageRegistration"),
          axios.get("/api/getClubs", {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }),
        ]);

        setRegistration(registrationResponse.data);
        const academicYearId = registrationResponse.data[0]?.academic_year_id;
        setAcademicYearId(academicYearId);

        if (clubResponse.status === 200) {
          setClubData(clubResponse.data);
        } else {
          toast.error("Failed to fetch clubs");
        }

        if (data.clubName) {
          setIsLoading(true);
          const courseResponse = await axios.get(`/api/getCourses/byClub/${data.clubName}`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });

          if (courseResponse.status === 200) {
            setCourseData(courseResponse.data);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            toast.error("Failed to fetch courses");
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [data.clubName]);

  const filteredCourseData = useMemo(
    () => courseData.filter((course) => course.course_level === data.courseLevel),
    [courseData, data.courseLevel]
  );

  if (registration.length === 0) {
    return (
      <div className="ClubRegistrationComponent">
        <div className="ClubRegistrationComponent-in">
          <Navbar />
          <div className="ClubRegistration-notOpen">
            <h1>Registration's are closed</h1>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="ClubRegistrationComponent">
      <div className="ClubRegistrationComponent-in">
        <div className="ClubRegistration-Nav">
          <Navbar />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="ClubRegistration-one">
            <div className="ClubRegistration-one-in">
              <div className="cr-one">
                <h1>Club Registration</h1>
              </div>
              <div className="cr-two">
                <div className="cr-two-in">
                  <div className="cr-two-in-one crInput">
                    <input
                      type="text"
                      placeholder="Enter your Name as per University Records"
                      value={data.name}
                      name="name"
                      className="registrationInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="cr-two-in-two crInput">
                    <input
                      type="text"
                      placeholder="Enter your University Id Number"
                      value={data.idNumber}
                      name="idNumber"
                      className="registrationInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="cr-two-in-three crInput">
                    <input
                      type="text"
                      placeholder="Enter your Email"
                      value={data.email}
                      name="email"
                      className="registrationInput"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="cr-three">
                <div className="cr-three-in">
                  <div className="cr-three-in-one crSelect">
                    <select
                      name="branch"
                      value={data.branch}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value="">Select your branch</option>
                      {branchNames.map((branch) => (
                        <option key={branch.id} value={branch.name}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="cr-three-in-two crSelect">
                    <select
                      name="gender"
                      value={data.gender}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value=" ">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="cr-three-in-three crSelect">
                    <div className="cr-three-in-three-one">
                      <select
                        name="countryCode"
                        value={data.countryCode}
                        onChange={handleChange}
                        id="selectInput"
                      >
                        <option value="">Country code</option>
                        {countryCodes.map((country, index) => (
                          <option
                            key={`${country.code}-${index}`}
                            value={country.dial_code}
                          >
                            {country.dial_code} ({country.name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="cr-three-in-three-two crInput">
                      <input
                        type="text"
                        placeholder="Enter your Phone Number"
                        value={data.phoneNumber}
                        name="phoneNumber"
                        className="registrationInput"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="cr-four">
                <div className="cr-four-in">

                <div className="cr-four-in-one crSelect">
                    <select
                      name="year"
                      value={data.year}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value="">Select Academic Year</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  <div className="cr-four-in-one crSelect">
                    <select
                      name="residency"
                      value={data.residency}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value=" ">Residency</option>
                      <option value="Day Scholar">Day Scholar</option>
                      <option value="Hosteler">Hosteler</option>
                    </select>
                  </div>

                  {data?.residency === "Hosteler" &&
                    data?.gender === "Female" && (
                      <div className="cr-four-in-two crSelect">
                        <select
                          name="hostelName"
                          value={data.hostelName}
                          onChange={handleChange}
                          id="selectInput"
                        >
                          <option value=" ">Select Hostel Name</option>
                          {girlHostels.map((hostel) => (
                            <option
                              key={hostel.hostelName}
                              value={hostel.hostelName}
                            >
                              {hostel.hostelName}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  {data?.residency === "Hosteler" && data?.gender === "Male" && (
                    <div className="cr-four-in-two crSelect">
                      <select
                        name="hostelName"
                        value={data.hostelName}
                        onChange={handleChange}
                        id="selectInput"
                      >
                        <option value=" ">Select Hostel Name</option>
                        {boyHostels.map((hostel) => (
                          <option
                            key={hostel.hostelName}
                            value={hostel.hostelName}
                          >
                            {hostel.hostelName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {data?.residency === "Day Scholar" && (
                    <div className="cr-four-in-three crSelect">
                      <select
                        name="busRoute"
                        value={data.busRoute}
                        onChange={handleChange}
                        id="selectInput"
                      >
                        <option value=" ">
                          Select Bus Route / Own transport
                        </option>
                        <option value="Own Transport">Own Transport</option>
                        {busRoutes.map((route) => (
                          <option
                            key={route.id}
                            value={route.Location + "-" + route.Route}
                          >
                            {route.Location + "-" + route.Route}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="cr-five">
                <div className="cr-five-in">
                  <div className="cr-five-in-one crSelect">
                    <select
                      name="country"
                      value={data.country}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value=" ">Select your country</option>
                      {countryNames.map((country, index) => (
                        <option key={`${country}-${index}`} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {data?.country === "India" ? (
                    <div className="cr-five-in-two crSelect">
                      <div className="cr-five-in-two-one">
                        <select
                          name="state"
                          value={data.state}
                          onChange={handleChange}
                          id="selectInput"
                        >
                          <option value=" ">Select your state</option>
                          {Object.keys(districtNames).map((state, index) => (
                            <option key={`${state}-${index}`} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="cr-five-in-two-two crSelect">
                        <select
                          name="district"
                          value={data.district}
                          onChange={handleChange}
                          id="selectInput"
                        >
                          <option value=" ">Select your district</option>
                          {districtNames[data.state]?.map((district, index) => (
                            <option key={`${district}-${index}`} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : null}

                  <div className="cr-five-in-three crInput">
                    <input
                      type="text"
                      placeholder="Enter your Pin Code"
                      value={data.pinCode}
                      name="pinCode"
                      className="registrationInput"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="cr-six">
                <div className="cr-six-in">
                  <div className="cr-six-in-one crSelect">
                    <select
                      name="domain"
                      value={data.domain}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value=" ">Select your domain</option>
                      <option value="TEC">Central Technology Clubs under SAC</option>
                      <option value="LCH">Liberal Arts, Creative Arts and Hobby Clubs</option>
                      <option value="ESO">Extension & Society Outreach Clubs</option>
                      <option value="IIE">Innovation, Incubation and Entrepreneurship Clubs</option>
                      <option value="HWB">Health and Wellbeing Clubs</option>
                    </select>
                  </div>

                  <div className="cr-six-in-two crSelect">
                    <select
                      name="clubName"
                      value={data.clubName}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value=" ">Select your club</option>

                      {data.domain === " " && (
                          <option value="">Select your Domain First</option>
                        )}

                      {data.domain === "TEC" &&
                        techClubs.map((club) => (
                          <option key={club.id} value={club.club_name}>
                            {club.club_name}
                          </option>
                        ))}
                      {data.domain === "LCH" &&
                        lchClubs.map((club) => (
                          <option key={club.id} value={club.club_name}>
                            {club.club_name}
                          </option>
                        ))}
                      {data.domain === "ESO" &&
                        esoClubs.map((club) => (
                          <option key={club.id} value={club.club_name}>
                            {club.club_name}
                          </option>
                        ))}
                      {data.domain === "IIE" &&
                        hieClubs.map((club) => (
                          <option key={club.id} value={club.club_name}>
                            {club.club_name}
                          </option>
                        ))}
                      {data.domain === "HWB" &&
                        hwbClubs.map((club) => (
                          <option key={club.id} value={club.club_name}>
                            {club.club_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="cr-six-in-three crSelect">
                    <select
                      name="courseLevel"
                      value={data.courseLevel}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value="">Select course level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  {data.clubName && data.courseLevel && (
                    filteredCourseData.length > 0 ? (
                      <div className="cr-six-in-four crSelect">
                        <select
                        name="courseName"
                        value={data.courseName}
                        onChange={handleChange}
                        id="selectInput"
                      >
                        <option value="">Select a course</option>

                        {filteredCourseData.map((course) => (
                          <option key={course.id} value={course.course_name}>
                            {course.course_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="cr-six-in-four crSelect">
                      <p>No courses available</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cr-seven">
                <div className="cr-seven-in">
                  <div className="cr-seven-in-one">
                    <div className="cr-seven-in-one-one crInput">
                      <label htmlFor="idCard">ID Card (PDF MAX 2MB):</label>
                      <div className={`custom-file-input ${data.idCard ? 'file-added' : ''}`}>
                        <input
                          type="file"
                          id="idCard"
                          name="idCard"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "idCard")}
                        />
                        <span>{data.idCard ? data.idCard.name : 'Drop your ID card here'}</span>
                      </div>
                    </div>

                    <div className="cr-seven-in-one-two crInput">
                      <label htmlFor="erpReferenceNumber">ERP Reference Number:</label>
                      <input
                        type="text"
                        placeholder="Enter your ERP Reference Number"
                        value={data.erpReferenceNumber}
                        name="erpReferenceNumber"
                        className="registrationInput"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="cr-seven-in-two">
                    <button onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="ClubRegistration-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;