"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// imports start here
import Dashboard from "../dashboard/dashboard";

import "./page.css";

const Page = () => {
  const [registration, setRegistration] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);

  const [academicYearId, setAcademicYearId] = useState();

  const handleChange = (e) => {
    setAcademicYearId(e.target.value);
  };

  const handleClick = () => {
      if (window.confirm("Are you sure you want to open the registration?")) {
          handleRegistration();
      }
  };

  const handleDelete = async () => {

    if (!window.confirm("Are you sure you want to stop the registration?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `/api/admin/manageRegistration/delete`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Registration deleted successfully");
        setRegistration([]);
      } else {
        toast.error(response.data.message || "Failed to delete registration");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post(`/api/admin/manageRegistration`, academicYearId, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Registration opened successfully");
      } else {
        toast.error(response.data.message || "Failed to open registration");
      }
    } catch (error) {
      console.error("Error opening registration:", error);
      toast.error(error.response?.data?.message || "Failed to open registration");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [registrationResponse, academicYearsResponse] = await Promise.all(
          [
            axios.get("/api/admin/manageRegistration"),
            axios.get("/api/academicYears"),
          ]
        );
        setRegistration(registrationResponse.data);
        setAcademicYears(academicYearsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  console.log(registration);


  return (
    <Dashboard>
      <div className="ManageRegistrationComponent">
        <div className="ManageRegistrationComponent-in">
            
          {registration.length > 0 ? (
            <div className="manageRegistration-one">
              <h1>Manage Registration</h1>
              <table>
                <thead>
                  <tr>
                    <th>Academic Year</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registration.map((reg) => (
                    <tr key={reg.id}>
                      <td>{reg.year_range} - {reg.semester}</td>
                      <td>
                        <button onClick={handleDelete}>Stop Registration</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="manageRegistration-two">
              <div className="manageRegistration-two-in">

                <h1>Open Registration</h1>
                
                <div className="manageRegistration-two-in-one">
                  <select
                    name="academic_year"
                    value={academicYearId}
                    onChange={handleChange}
                  >
                    <option value="">Select Academic Year</option>
                  {academicYears.map((academicYear) => (
                    <option key={academicYear.id} value={academicYear.id}>
                      {academicYear.year_range} {"->"} {academicYear.semester}
                    </option>
                    ))}
                  </select>
                  <button onClick={handleClick}>Open Registration</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Page;
