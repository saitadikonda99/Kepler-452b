"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Dashboard from '../dashboard/dashboard'
import { toast } from "react-hot-toast";
import axios from 'axios'

// import icons here
import { FaUsers } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { GiPublicSpeaker } from "react-icons/gi";

import './page.css'

const page = () => {

    const [statsData, setStatsData] = useState({
        club_name: '',
        sessions_attended: 0,
        sessions_conducted: 0
    });

    useEffect( () => {
        
        const fetch = async () => {
            try {
                const response = await axios.get("/api/student/stats", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                
                if (response.status === 200) {
                    // Transform the array data into an object
                    const transformedData = response.data.reduce((acc, item) => {
                        acc[item.type] = item.value;
                        return acc;
                    }, {});
                    setStatsData(transformedData);
                } else {
                    toast.error("Failed to fetch stats");
                }
            } catch (error) {
                toast.error("Internal server error");
            }
        }

        fetch();

    }, [])


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
        <div className="StudentHomeComponent">
            <div className="StudentHomeComponent-in">
                <div className="SHome-one">
                    <h1>Welcome {userDetails.name}.</h1>
                    <p>Student</p>
                </div>
                <div className="SHome-two">
                    <div className="SHome-two-in">
                        <div className="SHome-two-in-one">
                            <div className="SHome-two-in-one-one">
                                <h1>My Club</h1>
                                <h1>{statsData.club_name}</h1>
                            </div>
                            <div className="SHome-two-in-one-two">
                                <FaUsers className='SHome-icon' />
                            </div>
                        </div>
                        <div className="SHome-two-in-two">
                            <div className="SHome-two-in-one-one">
                                <h1>Sessions Attended</h1>
                                <h1>{statsData.sessions_attended}</h1>
                            </div>
                            <div className="SHome-two-in-one-two">
                                <MdEventAvailable className='SHome-icon' />
                            </div>
                        </div>
                        <div className="SHome-two-in-three">
                            <div className="SHome-two-in-one-one">
                                <h1>Session Conducted</h1>
                                <h1>{statsData.sessions_conducted}</h1>
                            </div>
                            <div className="SHome-two-in-one-two">
                                <GiPublicSpeaker className='SHome-icon' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="SHome-three">
                    <p>Note: This is a beta version. If you experience any issues or discrepancies, please report them to the club lead or SAC Department.</p>
                </div>
            </div>
        </div>
    </Dashboard>
  )
}

export default page