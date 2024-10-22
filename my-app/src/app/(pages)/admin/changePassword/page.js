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

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/changePassword", details, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response);

      if (response.data.status === 200) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Invalid details");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
