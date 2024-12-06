"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import "./page.css";
import Loader from "../../../../animation/Loading";

import { LiaExternalLinkAltSolid } from "react-icons/lia";

const CLUB_ORDER = ["TEC", "LCH", "ESO", "IIE", "HWB"];

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      try {
        const response = await axios.get("/api/getCourses");
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

  const groupedAndSortedData = Object.entries(
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
  ).sort(([clubNameA, clubDataA], [clubNameB, clubDataB]) => {
    const indexA = CLUB_ORDER.indexOf(clubDataA.clubDomain);
    const indexB = CLUB_ORDER.indexOf(clubDataB.clubDomain);

    const safeIndexA = indexA !== -1 ? indexA : CLUB_ORDER.length;
    const safeIndexB = indexB !== -1 ? indexB : CLUB_ORDER.length;

    if (safeIndexA !== safeIndexB) {
      return safeIndexA - safeIndexB;
    }
    return clubNameA.localeCompare(clubNameB);
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
              <div className="Course-one-one-two">
                <Link href="https://kluniversityin-my.sharepoint.com/personal/brambabu_kluniversity_in/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSAC%20%2D%20HANDBOOK%2FSAC%2Epdf&parent=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSAC%20%2D%20HANDBOOK&ct=1733465825600&or=OWA%2DNT%2DMail&cid=07f9faa7%2De5ae%2D1ce4%2Df19d%2Dc40a226c07ab&ga=1" target="_blank">
                  <p>SAC Handbook</p>
                  <LiaExternalLinkAltSolid />
                </Link>
              </div>
            </div>
            {groupedAndSortedData.map(([clubName, { clubDomain, courses }]) => {
              const slots = courses.some(
                (course) =>
                  (course.course_slots ?? 0) - (course.register_students ?? 0) > 0
              );

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
                          <p className={slots ? "course-available" : "course-not-available"}>
                            {slots ? "Slots Available" : "No Slots Available"}
                          </p>
                        </div>
                      </div>
                      <div className="Co-one-three">
                        {openStates[clubName] ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
                                    <Link href={course.course_handout} target="_blank">
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

export default Page;
