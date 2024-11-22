"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Dashboard from "../dashboard/dashboard";
import "./page.css";

const Page = () => {
  const [courses, setCourses] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [updatedCourseData, setUpdatedCourseData] = useState({
    id: null,
    academicYear: "",
    courseCode: "",
    courseName: "",
    courseYear: "",
    courseSlots: "",
    courseHandout: "",
  });
  const [academicYears, setAcademicYears] = useState([]);

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await axios.delete(`/api/courses/deleteCourse/${courseId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          toast.success("Course deleted successfully");
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== courseId)
          );
        } else {
          toast.error(response.data.message || "Failed to delete course");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        toast.error(error.response?.data?.message || "Failed to delete course");
      }
    }
  };

  const handleActive = async (courseId, isActive) => {
    try {
      const response = await axios.post(`/api/courses/active/${courseId}`, {
        active: isActive,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      
      if (response.status === 200) {
        toast.success(response.data.message);
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === courseId ? { ...course, is_active: isActive } : course
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update course status");
      }
    } catch (error) {
      console.error("Error updating course status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update course status"
      );
    }
  };

  const handleChange = (e) => {
    setUpdatedCourseData({
      ...updatedCourseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setShowEdit(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        `/api/courses/editCourse`,
        updatedCourseData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Course updated successfully");
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === updatedCourseData.id ? updatedCourseData : course
          )
        );
        setShowEdit(false);
      } else {
        toast.error(response.data.message || "Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error(error.response?.data?.message || "Failed to update course");
    }
  };

  const handleEdit = (course) => {
    setShowEdit(true);
    setUpdatedCourseData({
      id: course.id,
      academicYear: course.academic_year_id,
      courseCode: course.course_code,
      courseName: course.course_name,
      courseYear: course.course_year,
      courseSlots: course.course_slots,
      courseHandout: course.course_handout,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, academicYearsResponse] = await Promise.all([
          axios.get("/api/courses/getCourses"),
          axios.get("/api/academicYears"),
        ]);

        setCourses(coursesResponse.data);
        setAcademicYears(academicYearsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="updateCourseComponent">
        <div className="updateCourseComponent-in">
          <h1>Manage Courses</h1>
          {showEdit ? (
            <div className="editCourseForm">
              <div className="editCourseForm-in">
                <div className="editCourseForm-in-one">
                  <label htmlFor="academic_year">Academic Year</label>
                  <select
                    name="academic_year"
                    value={updatedCourseData.academicYear}
                    onChange={handleChange}
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((academicYear) => (
                      <option key={academicYear.id} value={academicYear.id}>
                        {academicYear.year_range} {"->"} {academicYear.semester}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="editCourseForm-in-one">
                  <label htmlFor="courseCode">Course Code</label>
                  <input
                    type="text"
                    name="courseCode"
                    value={updatedCourseData.courseCode}
                    onChange={handleChange}
                    placeholder="Course Code"
                  />
                </div>
                <div className="editCourseForm-in-one">
                  <label htmlFor="courseName">Course Name</label>
                  <input
                    type="text"
                    name="courseName"
                    value={updatedCourseData.courseName}
                    onChange={handleChange}
                    placeholder="Course Name"
                  />
                </div>
                <div className="editCourseForm-in-one">
                  <label htmlFor="courseYear">Course Year</label>
                  <select
                    className="addCourse-select"
                    name="courseYear"
                    onChange={handleChange}
                    value={updatedCourseData.courseYear}
                  >
                    <option value="">Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="editCourseForm-in-one">
                  <label htmlFor="courseSlots">Course Slots</label>
                  <input
                    type="number"
                    name="courseSlots"
                    value={updatedCourseData.courseSlots}
                    onChange={handleChange}
                    placeholder="Course Slots"
                  />
                </div>
                <div className="editCourseForm-in-one">
                  <label htmlFor="courseHandout">Course Handout</label>
                  <input
                    type="text"
                    name="courseHandout"
                    value={updatedCourseData.courseHandout}
                    onChange={handleChange}
                  />
                </div>
                <div className="editCourseActions">
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleUpdate}>Update</button>
                </div>
              </div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Course Year</th>
                  <th>Course Slots</th>
                  <th>Course Handout</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id}>
                    <td>{++index}</td>
                    <td>{course.course_code}</td>
                    <td>{course.course_name}</td>
                    <td>{course.course_year}</td>
                    <td>{course.course_slots}</td>
                    <td>
                      <a href={course.course_handout} target="_blank">
                        View Handout
                      </a>
                    </td>
                    <td>
                      {course.is_active === 1 ? (
                        <button onClick={() => handleActive(course.id, 0)}>
                          Deactivate
                        </button>
                      ) : (
                        <button onClick={() => handleActive(course.id, 1)}>
                          Activate
                        </button>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(course)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(course.id)}>
                        Delete
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

export default Page;
