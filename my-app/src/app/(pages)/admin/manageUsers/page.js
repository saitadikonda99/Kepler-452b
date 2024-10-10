"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// imports start here
import Dashboard from "../dashboard/page"

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

                const updatedUsersData = usersData.filter((user) => user.id !== userId);

                setUsersData(updatedUsersData);

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

      const handleActive = async (userId, active) => {

        try {
          const response = await axios.post(`/api/admin/manageUsers/active`, {userId, active}, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });

          console.log(response)
  
          if (response.data.status === 200) {
            toast.success(response.data.message);
            const updatedUsersData = usersData.map((user) => {
              if (user.id === userId) {
                return {
                  ...user,
                  active: active,
                };
              }
              return user;
            });
            setUsersData(updatedUsersData);
          }
          else {
            toast.error("Failed to hold the user")
          }
        } catch (error) {
          toast.error(error.message)
        }
      };

  return (
      <Dashboard>
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
                                            <p>{user.role} : </p>
                                            {user.role === 'club_lead' ? <p>{user.club_name}</p> : null}
                                        </div>
                                        <div className="Active">
                                        {user.active === 1 ?
                                            <button onClick={() => handleActive(user.id, 0)}>
                                                Hold
                                            </button> :
                                            <button onClick={() => handleActive(user.id, 1)}>
                                                Activate
                                            </button>   
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleClick(user.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
      </Dashboard>
  );
};

export default page;
