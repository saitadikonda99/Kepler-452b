"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Dashboard from '../dashboard/dashboard'


// import icons here
import { FaUserGraduate } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { BsGraphUpArrow } from "react-icons/bs";

import './page.css'

import Chart from './chart/chart'

const page = () => {

    const [statsData, setStatsData] = useState({
        Members: 150,
        Activities: 300,
        Projects: 20,
      });
      

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
                <div className="LHome-one">
                    <h1>Welcome {userDetails.name}.</h1>
                    <p>Lead - ZeroOne The Code Club</p>
                </div>
                <div className="LHome-two">
                    <div className="LHome-two-in">
                        <div className="LHome-two-in-one">
                            <div className="LHome-two-in-one-one">
                                <p>Students</p>
                                <h1>100</h1>
                            </div>
                            <div className="LHome-two-in-one-two">
                                <FaUserGraduate className='LHome-icon' />
                            </div>
                        </div>
                        <div className="LHome-two-in-two">
                            <div className="LHome-two-in-one-one">
                                <h1>Activities</h1>
                                <h1>200</h1>
                            </div>
                            <div className="LHome-two-in-one-two">
                                <SiGoogleclassroom className='LHome-icon' />
                            </div>
                        </div>
                        <div className="LHome-two-in-three">
                            <div className="LHome-two-in-one-one">
                                <h1>Projects</h1>
                                <h1>11</h1>
                            </div>
                            <div className="LHome-two-in-one-two">
                                <BsGraphUpArrow className='LHome-icon' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="LHome-three">
                    <div className="LHome-three-in">
                        <div className="LHome-three-in-one">
                            <Chart statsData={statsData} /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Dashboard>
  )
}

export default page