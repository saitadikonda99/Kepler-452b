"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Navbar from "../../../sil/Navbar";
import Footer from "../../../components/footer/page";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import "./page.css";

import Loader from '../../../../animation/Loading';


const DOMAIN_ORDER = ["Technical", "Literary & Cultural", "Social", "Sports", "Others"];

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [openStates, setOpenStates] = useState({});

  const toggleOpen = (clubName) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [clubName]: !prevStates[clubName],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getCourses");

        if (response.status === 200) {
          setCourseData(response.data);
          setIsLoading(false);
        } else {
          console.error("Error fetching data");
          toast.error("Failed to load data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  console.log(courseData);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="CourseComponent">
      <div className="CourseComponent-in">
        <div className="Course-one">
          <div className="Course-one-in">

            <div className="Course-one-one">
              <h1>All Clubs Program Details</h1>
            </div>

            {Object.entries(
              courseData.reduce((acc, course) => {
                if (!acc[course.club_name]) {
                  acc[course.club_name] = {
                    clubDomain: course.club_domain,
                    courses: [],
                  };
                }
                acc[course.club_name].courses.push(course);
                return acc;
              }, {})
            )
              .sort(([clubNameA, clubA], [clubNameB, clubB]) => {
                const indexA = DOMAIN_ORDER.indexOf(clubA.clubDomain);
                const indexB = DOMAIN_ORDER.indexOf(clubB.clubDomain);
                if (indexA !== -1 && indexB !== -1) {
                  return indexA - indexB;
                } else if (indexA !== -1) {
                  return -1;
                } else if (indexB !== -1) {
                  return 1;
                } else {
                  return clubNameA.localeCompare(clubNameB);
                }
              })
              .map(([clubName, { clubDomain, courses }]) => {
                const slots = courses.some((course) => course.course_slots - course.register_students > 0);

                return (
                  <div key={clubName} className="Course-one-two">
                    <div className="Course-one-two-in">
                      <div className="Co-one" onClick={() => toggleOpen(clubName)}>
                        <div className="Co-one-one">
                          <p>{clubName}</p>
                        </div>
                        <div className="Co-one-two">
                          <div className="Co-one-two-in-one">
                            <p>Domain: {clubDomain}</p>
                          </div>
                          <div className="Co-one-two-in-two">
                            <p className={slots ? "course-available" : "course-not-available"}>{slots ? "Slots Available" : "No Slots Available"}</p>
                          </div>
                        </div>
                        <div className="Co-one-three">
                          {openStates[clubName] ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </div>
                      </div>
                      {openStates[clubName] && (
                        <div className="Co-two">
                          <div className="Co-two-in">
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
                                        <Link href={course.course_handout}>
                                            <p>Handout</p>
                                        </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
