"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// imports start here
import Dashboard from "../dashboard/dashboard";

import "./page.css";

const page = () => {

  const [usersData, setUsersData] = useState([]);

  const handleClick = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      handleDelete(userId);
    }
  };

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
  };

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
      const response = await axios.post(
        `/api/admin/manageUsers/active`,
        { userId, active },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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
      } else {
        toast.error("Failed to hold the user");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dashboard>
      <div className="ManageUserComponent">
        <div className="ManageUserComponent-in">
          <div className="ManageUser-one">
            <div className="ManageUser-one-in">
              <div className="ManageUser-one-in-one">
                <h1>Manage Users</h1>
              </div>
            </div>
          </div>

          <div className="ManageUser-two">
            <div className="ManageUser-two-in">
              <table>
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Club</th>
                    <th>Status</th>
                    <th>Delete User</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(usersData) &&
                    usersData.map((user, index) => (
                      <tr key={user.id}>
                        <td>{++index}</td>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.club_name}</td>
                        <td>
                          {user.active === 1 ? (
                            <button
                              className="HoldButton"
                              onClick={() => handleActive(user.id, 0)}
                            >
                              Hold User
                            </button>
                          ) : (
                            <button
                              className="ActivateButton"
                              onClick={() => handleActive(user.id, 1)}
                            >
                              Activate User
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            className="DeleteButton"
                            onClick={() => handleClick(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
