"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

// import components here
import Dashboard from "../dashboard/page"


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
        toast.success("password changed successful");
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
        <div className="ChangePasswordComponent">
              <div className="ChangePasswordComponent-in-one">
                <h1>Change Password</h1>
                <input
                  type="text"
                  value={details.password}
                  placeholder="enter new password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="ChangePasswordComponent-in-two">
                <input
                  type="text"
                  placeholder="confirm password"
                  value={details.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </div>
              <div className="ChangePasswordComponent-in-seven">
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
      </Dashboard>
  );
};

export default Page;
