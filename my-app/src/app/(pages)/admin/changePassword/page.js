"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

// import components here
import Dashboard from "../dashboard/dashboard"


import "./page.css";

const Page = () => {
  const [details, setDetails] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/changePassword", details, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully");
        // Reset form or redirect as needed
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error(error.response.data.message || "Bad request");
            break;
          case 401:
            toast.error("Unauthorized");
            break;
          case 403:
            toast.error("Forbidden");
            break;
          default:
            toast.error("An error occurred while changing the password");
        }
      } else {
        toast.error("An error occurred while changing the password");
      }
    }
  };

  return (
    <Dashboard>
      <div className="ChangePassword">
        <div className="ChangePasswordComponent">
          <div className="ChangePasswordComponent-one">
            <h1>Change Password</h1>
          </div>
          <div className="ChangePasswordComponent-two">
            <div className="ChangePasswordComponent-two-in-one">
              <h3>Update Your Password</h3>
            </div>
            <div className="ChangePasswordComponent-two-in-two">
              <div className="ChangePasswordComponent-two-in-two-a">
                <div className="ChangePasswordComponent-two-in-two-a-one">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    name="password"
                    value={details.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="ChangePasswordComponent-two-in-two-a-two">
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    value={details.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="ChangePasswordComponent-two-in-two-b">
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Page;
