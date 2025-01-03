"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import "./page.css";
import Loader from "../../../../animation/Loading";

import { LiaExternalLinkAltSolid } from "react-icons/lia";

const DOMAIN_ORDER = ["TEC", "LCH", "ESO", "IIE", "HWB"];

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [openStates, setOpenStates] = useState({});
  const [clubOpenStates, setClubOpenStates] = useState({});

  const toggleDomainOpen = (domain) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [domain]: !prevStates[domain],
    }));
  };

  const toggleClubOpen = (domain, clubName) => {
    setClubOpenStates((prevStates) => ({
      ...prevStates,
      [`${domain}-${clubName}`]: !prevStates[`${domain}-${clubName}`],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/clubRegistration/getCourses");
        if (response.status === 200) {
          setCourseData(response.data);
        } else {
          console.error("Error fetching data");
          toast.error("Failed to load data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  if (isLoading) {
    return <Loader />;
  }

  // Group courses by domain and club
  const groupedData = DOMAIN_ORDER.reduce((acc, domain) => {
    acc[domain] = {};
    return acc;
  }, {});

  courseData.forEach((course) => {
    const domain = course.club_domain || "Uncategorized";
    if (!groupedData[domain]) groupedData[domain] = {};
    if (!groupedData[domain][course.club_name]) {
      groupedData[domain][course.club_name] = [];
    }
    groupedData[domain][course.club_name].push(course);
  });

  return (
    <div className="CourseComponent">
      <div className="CourseComponent-in">
        <div className="Course-one">
          <div className="Course-one-in">
            <div className="Course-one-one">
              <div className="Course-one-one-one">
                <h1>Clubs Program Details</h1>
              </div>
            </div>

            {DOMAIN_ORDER.map((domain) => {
              const clubs = groupedData[domain];
              if (!clubs || Object.keys(clubs).length === 0) return null;

              return (
                <div key={domain} className="Domain-container">
                  <div className="Domain-header" onClick={() => toggleDomainOpen(domain)}>
                    <div className="Domain-name">
                      <p>
                      {domain === "TEC" ? "Technology Clubs" : domain === "LCH" ? "Liberal Arts, Creative Arts and Hobby Clubs" : domain === "ESO" ? "Extension & Society Outreach Clubs" : domain === "IIE" ? "Innovation, Incubation and Entrepreneurship Clubs" : "Health and Wellbeing Clubs"}
                      </p>
                    </div>
                    <div className="Domain-toggle">
                      {openStates[domain] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                  </div>
                  {openStates[domain] && (
                    <div className="Club-list">
                      {Object.entries(clubs).map(([clubName, courses]) => (
                        <div key={clubName} className="Club-one">
                          <div className="Club-one-in">
                            <div onClick={() => toggleClubOpen(domain, clubName)} className="Club-header">
                              <div className="Club-name">
                                <h3>{clubName}</h3>
                              </div>
                              <div className={`Club-slots ${
                                courses.some(
                                  (course) => 
                                    (course.course_slots ?? 0) - (course.register_students ?? 0) > 0
                                ) ? 'course-available' : 'course-not-available'
                              }`}>
                                {courses.some(
                                  (course) =>
                                    (course.course_slots ?? 0) - (course.register_students ?? 0) > 0  
                                ) ? <p>Slots Available</p> : <p>Slots Not Available</p>}
                              </div>
                              <div className="Club-toggle">
                                {clubOpenStates[`${domain}-${clubName}`] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                              </div>
                            </div>
                            {clubOpenStates[`${domain}-${clubName}`] && (
                              <div className="Course-table-container">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Program Name</th>
                                      <th>Program Code</th>
                                      <th>Program Slots</th>
                                      <th>Program Level</th>
                                      <th>Program Handout</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {courses.map((course) => (
                                      <tr key={course.course_id}>
                                        <td>{course.course_name}</td>
                                        <td>{course.course_code}</td>
                                        <td>{course.course_slots}</td>
                                        <td>{course.course_level}</td>
                                        <td>
                                          <a href={course.course_handout} target="_blank">
                                            Handout
                                          </a>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
