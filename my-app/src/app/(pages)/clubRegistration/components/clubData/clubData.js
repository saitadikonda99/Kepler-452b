"use client"
import React, { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "./page.css";

import Loader from '../../../../animation/Loading';



const page = ({ data, setData }) => {
  const [clubData, setClubData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "courseName") {
      setData({
        ...data,
        [name]: value,
        courseId: courseData.find((course) => course.course_name === value)?.id,
      });
    } 
    else if (name === "clubName") {
      setData({
        ...data,
        [name]: value,
        clubId: clubData.find((club) => club.club_name === value)?.id,
      });
    }
    else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleFileChange = useCallback((e, name) => {
    const file = e.target.files[0];
    setData(prevData => ({
      ...prevData,
      [name]: file,
    }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const clubResponse = await axios.get("/api/getClubs", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        console.log("sai", clubResponse.data);

        if (clubResponse.status === 200) {
          setClubData(clubResponse.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Failed to fetch clubs");
        }

        if (data.clubName) {
          setIsLoading(true);
          const courseResponse = await axios.get(
            `/api/getCourses/byClub/${data.clubName}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

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
    () =>
      courseData.filter((course) => course.course_level === data.courseLevel),
    [courseData, data.courseLevel]
  );

  const techClubs = useMemo(
    () =>
      clubData.filter(
        (club) => club.club_domain === "TEC" && club.active === 1
      ),
    [clubData]
  );
  const lchClubs = useMemo(
    () =>
      clubData.filter(
        (club) => club.club_domain === "LCH" && club.active === 1
      ),
    [clubData]
  );
  const esoClubs = useMemo(
    () =>
      clubData.filter(
        (club) => club.club_domain === "ESO" && club.active === 1
      ),
    [clubData]
  );
  const hieClubs = useMemo(
    () =>
      clubData.filter(
        (club) => club.club_domain === "IIE" && club.active === 1
      ),
    [clubData]
  );
  const hwbClubs = useMemo(
    () =>
      clubData.filter(
        (club) => club.club_domain === "HWB" && club.active === 1
      ),
    [clubData]
  );

  return (
    isLoading ? <Loader /> :
    <div className="ClubDataComponent">
      <div className="ClubDataComponent-in">
        <div className="ClubData-one">
          <h1>Club Data</h1>
          <p>
            Please provide the following information to help us verify your
            address.
          </p>
        </div>
        <div className="ClubData-two">
          <div className="ClubData-two-one crSelect">
            <select
              name="domain"
              value={data.domain}
              onChange={handleChange}
              id="selectInput"
            >
              <option value=" ">Select your domain</option>
              <option value="TEC">Technology Clubs</option>
              <option value="LCH">
                Liberal Arts, Creative Arts and Hobby Clubs
              </option>
              <option value="ESO">Extension & Society Outreach Clubs</option>
              <option value="IIE">
                Innovation, Incubation and Entrepreneurship Clubs
              </option>
              <option value="HWB">Health and Wellbeing Clubs</option>
            </select>
          </div>
        </div>
        <div className="clubData-three">
          <div className="ClubData-three-one crSelect">
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
          <div className="ClubData-three-two crSelect">
            <select
              name="courseLevel"
              value={data.courseLevel}
              onChange={handleChange}
              id="selectInput"
            >
              <option value="">Select Program Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>
          <div className="ClubData-three-three crSelect">
            {data.clubName &&
              data.courseLevel &&
              (filteredCourseData.length > 0 ? (
                <select
                  name="courseName"
                  value={data.courseName}
                  onChange={handleChange}
                  id="selectInput"
                >
                  <option value="">Select a Program</option>

                  {filteredCourseData.map((course) => (
                    <option key={course.id} value={course.course_name}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>No courses available</p>
              ))}
          </div>
        </div>
        <div className="ClubData-four">
          <div className="ClubData-four-one">
            <div className="ClubData-four-one-one crInput">
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

            <div className="ClubData-four-one-two crInput">
              <label htmlFor="erpReferenceNumber">ERP Payment Receipt Number/Order Number:</label>
              <input
                type="text"
                placeholder="please provide correct reference number it will be verified by SAC"
                value={data.erpReferenceNumber}
                name="erpReferenceNumber"
                className="registrationInput"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
