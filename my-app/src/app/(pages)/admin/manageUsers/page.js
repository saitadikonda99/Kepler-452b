"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// imports start here
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/page'

import './page.css'

const page = () => {

    const [usersData, setUsersData] = useState([]);

    const handleClick = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            handleDelete(userId);
        }
    }


    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`/api/admin/manageUsers/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success("User deleted successfully");
                window.location.reload();
            }
            
        } catch (error) {
            toast.error("Internal server error");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/api/admin/manageUsers`, {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
    
            if (response.status === 200) {
                setUsersData(response.data);
            } else {
              toast.error("Failed to fetch events");
            }

          } catch (error) {
            console.log(error);
            toast.error("Internal server error");
          }
        };
    
        fetchData();
      }, []);

  return (
    <div className="ManageUsersComponent">
      <div className="ManageUsersComponent-in">
        <div className="ManageUsersComponent-Nav">
          <Navbar />
        </div>
        <div className="ManageUsersComponent-one">
          <div className="ManageUsersComponent-one-in">
            <div className="DC-sideBar">
                <Sidebar />
            </div>
            <div className="DC-one">
                {
                    Array.isArray(usersData) && usersData.map((user) => (
                        
                        <div key={user.id} className="DC-one-card">
                            <div className="DC-one-card-in">
                                <div className="DC-one-card-logo">
                                <h3>{user.username}</h3>
                                </div>
                                <div className="DC-one-card-details">
                                    <div className="DC-one-card-details-in">
                                        <div className="DC-one-card-details-name">
                                            <h3>{user.name}</h3>
                                        </div>
                                        <div className="DC-one-card-details-lead">
                                            <p>{user.email}</p>
                                        </div>
                                        <div className="DC-one-card-details-lead">
                                            <p>{user.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleClick(user.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
          </div>
        </div>

        <div className="ManageUsersComponent-Footer">
          <div className="ManageUsersComponent-Footer-in">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
