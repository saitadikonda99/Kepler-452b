"use client"
import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";



// imports start here
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/page";
import Dashboard from '../dashboard/dashboard'

import "./page.css";

const page = () => {
  const [adminData, setAdminData] = useState({
    adminUsername: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminConfirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSubmit = async () => {  

        try {
            const response = await axios.post("/api/admin/addAdmin", adminData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            console.log(response);

            if (response.status === 200) {
                toast.success("Admin added successfully");
            }
            else {
                toast.error("Something went wrong");
            }

        } catch (error) {
            if (error?.response) {
                switch (error.response.status) {
                    case 400:
                        toast.error("passwords do not match");
                        break;
                    case 401:
                        toast.error("Admin already exists");
                        break;
                    default:
                        toast.error("Something went wrong");
                }
            }
        }
    }

  return (
      <Dashboard>
          <div className="AddAdminComponent">
            <div className="AddAdminComponent-in">
                <div className="AddAdminComponent-in-one">
                  <h3>Add a new Admin</h3>
                </div>
             <div className="AddAdminComponent-in-two">
              <div className="AddAdminComponent-in-two-box">
                 <input
                  type="text"
                  placeholder="Admin username"
                  name="adminUsername"
                  value={adminData.adminUsername}
                  onChange={handleChange}
                  />
                </div>
              <div className="AddAdminComponent-in-two-box">
                   <input
                   type="text"
                   placeholder="Admin name"
                   name="adminName"
                   value={adminData.adminName}
                   onChange={handleChange}
                   />
             </div>
             <div className="AddAdminComponent-in-two-box">
                 <input
                    type="email"
                    placeholder="Admin email"
                    name="adminEmail"
                    value={adminData.adminEmail}
                    onChange={handleChange}
                    />
                    </div>
             </div>

              <div className="AddAdminComponent-in-three">
                <div className="AddAdminComponent-in-three-box">
                   <input
                    type="password"
                    placeholder="Admin password"
                    name="adminPassword"
                    value={adminData.adminPassword}
                    onChange={handleChange}
                    />
                </div>
                <div className="AddAdminComponent-in-three-box">
                    <input
                    type="password"
                    placeholder="Confirm password"
                    name="adminConfirmPassword"
                    value={adminData.adminConfirmPassword}
                    onChange={handleChange}
                    />
                </div>
                <div className="AddAdminComponent-in-three-button">
                <button onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
         </div>
      </Dashboard>
  );
};

export default page;