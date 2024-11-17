"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Dashboard from '../dashboard/dashboard'
import axios from 'axios'
import toast from "react-hot-toast";

import './page.css'


const page = () => {

    const [userDetails, setUserDetails] = useState({
        username: "",
        name: "",
        role: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserDetails({
            username: user.username,
            name: user.name,
            role: user.role,
        });
    }, []);


  return (
    <Dashboard>
        <div className="LeadHomeComponent">
            <div className="LeadHomeComponent-in">
                <h1>Welcome {userDetails.name}.</h1>
            </div>
        </div>
    </Dashboard>
  )
}

export default page