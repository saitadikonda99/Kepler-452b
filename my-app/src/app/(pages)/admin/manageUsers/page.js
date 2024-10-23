"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// imports start here
import Dashboard from "../dashboard/dashboard";

import "./page.css";

const Page = () => {

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
        setUsersData((prevData) => prevData.filter((user) => user.id !== userId));
      } else {
        toast.error(response.data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
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
          toast.error(response.data.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(error.response?.data?.message || "Failed to fetch users");
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

      if (response.status === 200) {
        toast.success(response.data.message);
        setUsersData((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, active } : user
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error(error.response?.data?.message || "Failed to update user status");
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

export default Page;
