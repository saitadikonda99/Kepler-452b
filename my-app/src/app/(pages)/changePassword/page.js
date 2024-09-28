"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import './page.css'

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
    <div className="ChangePasswordComponent">
      <div className="ChangePasswordComponentComponent-in">
        <div className="ChangePasswordComponent-one">
          <h1>ChangePassword</h1>
          <p>Please carefully enter the details</p>
        </div>
        <div className="ChangePasswordComponent-two">
          <div className="ChangePasswordComponent-two-in">
            <div className="ChangePasswordComponent-in-one">
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
        </div>
      </div>
    </div>
  );
};

export default Page;
