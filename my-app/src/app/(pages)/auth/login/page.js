"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import "./page.css";

const Login = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userData.username || !userData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response);

      if (response.status === 200) {
        toast.success("Login successful");
      }

      if (response.data.status === 401) {
        toast.error("Invalid credentials");
      }
      if (response.data.status === 500) {
        toast.error("Internal server error");
      }

      const role = response.data.role;

      switch (role) {
        case "Admin":
          router.push("/admin/dashboard");
          break;
        case "President":
          router.push("/president/dashboard");
          break;
        default:
          router.push("/");
          break;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="LoginComponent">
      <div className="LoginComponent-in">
        <div className="Login-one">
          <h1>SAC Admin Dashboard</h1>
        </div>
        <div className="Login-two">
          <div className="Login-two-in">
            <div className="Login-in-one">
              <input
                type="text"
                value={userData.username}
                onChange={handleInput}
                name="username"
                placeholder="username"
              />
            </div>
            <div className="Login-in-two">
              <input
                type="password"
                value={userData.password}
                onChange={handleInput}
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="Login-in-three">
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
