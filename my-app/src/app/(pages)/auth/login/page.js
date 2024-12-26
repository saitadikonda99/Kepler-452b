"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import { toast } from "react-hot-toast";
import Link from 'next/link';

import Loader from '../../../animation/Loading';

import "./page.css";

const Login = () => {
  const router = useRouter();
  const pathname = usePathname()

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [randomText, setRandomText] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    generateRandomText();
  }, []);

  const generateRandomText = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomText(result);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userData.username || !userData.password) {
      toast.error("Please fill all fields");
      return;
    }

    if (userInput.toLowerCase() !== randomText.toLowerCase()) {
      toast.error("Verification text doesn't match");
      generateRandomText();
      setUserInput('');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const role = response.data.role;

        setIsLoading(false);

        const user = {
          id: response.data.id,
          name: response.data.name,
          username: response.data.username,
          role: response.data.role,
        };
  
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful");

        // Use router.push without await for faster perceived navigation
        switch (role) {
          case "Admin":
            router.push("/admin/home");
            break;
          case "club_lead":
            router.push("/lead/home");
            break;
          case "student":
            router.push("/student/home");
            break;
          default:
            router.push("/");
            break;
        }
      }
      else {
        setIsLoading(false);
        toast.error(response.data.message);
      }

    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'verificationText') {
      setUserInput(value);
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  return (
    isLoading ? <Loader /> : 
    <div className="LoginComponent">
      <div className="LoginComponent-in">
        <div className="Login-one">
          <h1>Welcome to SAC Portal</h1>
        </div>
        <div className="Login-two">
          <div className="Login-two-in">
            <div className="Login-in-one">
              <input
                type="text"
                value={userData.username}
                onChange={handleInput}
                name="username"
                placeholder="Username"
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
              <div className="Login-in-three-one">
                {
                  randomText.split('').map((char, index) => (
                    <p key={index}>{char}</p>
                  ))
                }
              </div>
                <div className="Login-in-three-two">
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleInput}
                    name="verificationText"
                    placeholder="Enter text"
                  />
                </div>
            </div>
            <div className="Login-in-four">
              <button onClick={handleLogin}>Login</button>
            </div>
            <div className="Login-in-five">
              <Link href="/auth/forgotPassword">Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
