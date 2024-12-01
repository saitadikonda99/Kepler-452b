"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

import Dashboard from "../dashboard/dashboard";
import "./page.css";

import Loader from "../../../animation/Loading";

import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const page = () => {
  const [courseData, setCourseData] = useState({
    academicYear: "",
    courseName: "",
    courseCode: "",
    courseLevel: "",
    courseSlots: "",
    courseHandout: "",
  });

  const [academicYears, setAcademicYears] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/courses/addCourse", courseData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message.includes("Duplicate entry")) {
        toast.error("Course code already exists");
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dashboard>
      <div className="addCourseComponent">
        <div className="addCourseComponent-in">
          <div className="addCourse-one">
            <div className="addCourse-one-one">
              <p>
                Instructions{" "}
                <MdOutlineIntegrationInstructions className="addCourse-icon" />
              </p>
            </div>
            <div className="addCourse-one-two">
              <div className="addCourse-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  The course code is created using details like the club name,
                  course name, year offered, and academic year.
                </p>
              </div>

              <div className="addCourse-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Example: If the club name is ZeroOne, the course name is Web
                  Development, the year offered is 2, and the academic year is
                  2024-25, the course code could be 24ZOCC2WD.
                </p>
              </div>
            </div>
          </div>

          <div className="addCourse-two">
            <div className="addCourse-two-one">
              <select
                className="addCourse-select"
                name="academicYear"
                onChange={handleChange}
                value={courseData.academicYear}
              >
                <option value="">Select Academic Year</option>
                {academicYears.map((academicYear) => (
                  <option key={academicYear.id} value={academicYear.id}>
                    {academicYear.year_range} {"->"} {academicYear.semester}
                  </option>
                ))}
              </select>
            </div>
            <div className="addCourse-two-two">
              <input
                className="addCourse-input"
                name="courseName"
                placeholder="Course Name"
                value={courseData.courseName}
                onChange={handleChange}
              />
            </div>
            <div className="addCourse-two-three">
              <input
                className="addCourse-input"
                name="courseCode"
                placeholder="Course Code"
                value={courseData.courseCode}
                onChange={handleChange}
              />
            </div>
            <div className="addCourse-two-four">
              <select
                className="addCourse-select"
                name="courseLevel"
                onChange={handleChange}
                value={courseData.courseLevel}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
              </select>
            </div>
            <div className="addCourse-two-five">
              <input
                type="text"
                className="addCourse-input"
                name="courseSlots"
                placeholder="Number of Slots"
                value={courseData.courseSlots}
                onChange={handleChange}
              />
            </div>
            <div className="addCourse-two-six">
              <input
                type="text"
                className="addCourse-input"
                name="courseHandout"
                placeholder="Course Handout pdf link"
                value={courseData.courseHandout}
                onChange={handleChange}
              />
            </div>
            <div className="addCourse-two-seven">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
