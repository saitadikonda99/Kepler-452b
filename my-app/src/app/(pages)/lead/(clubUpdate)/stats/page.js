"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";

import Dashboard from "../../dashboard/dashboard";

import './page.css'

const page = () => {

    const [show, setShow] = useState(false);
    const [StatsData, setStatsData] = useState([]);

    const [updatedData, setUpdatedData] = useState({
        clubId: null,
        Members: null,
        Activities: null,
        Projects: null
    })

    const handleClick = (clubId) => {
        return () => {
            setShow(true);
            const data = StatsData.find(data => data.club_id === clubId);

            setUpdatedData({
                clubId: clubId,
                Members: data.total_members,
                Activities: data.total_activities,
                Projects: data.total_projects
            });   
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleCancel = () => {
        setShow(false);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post("/api/clubUpdate/stats", updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.data.status === 200) {
                toast.success("Stats updated successfully!");
                setShow(false);
            } else {
                toast.error("Failed to update Stats");
            }
        } catch (error) {
            toast.error("Internal server error");
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/clubUpdate/stats');

                console.log(response.data)

                if (response.status === 200) {
                    setStatsData(response.data);
                } else {
                    toast.error("Failed to fetch Stats");
                }
            } catch (error) {
                toast.error("Internal server error");
            }
        }
        fetchData();
    }, [])
    
  return (
    <Dashboard>
        <div className="StatsComponent">
            <div className="StatsComponent-in">
                { show ? 
                    <div className="Stats-one">
                        <div className="Stats-one-in">

                            <div className="StatsUpdate-two">
                                <p>you can update the Stats here</p>
                            </div>

                            <div className="StatsUpdate-two">
                                <label htmlFor="Members" className="label">Total Members</label>
                                <input
                                    type="text"
                                    value={updatedData.Members}
                                    placeholder="Total number of Members"
                                    id="Members"
                                    name="Members"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="StatsUpdate-three">
                                <label htmlFor="Activities" className="label">Total Activities</label>
                                <input
                                    type="text"
                                    value={updatedData.Activities}
                                    placeholder="Total number of Activities"
                                    id="Activities"
                                    name="Activities"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="StatsUpdate-four">
                                <label htmlFor="Projects" className="label">Total Projects</label>
                                <input
                                    type="text"
                                    value={updatedData.Projects}
                                    placeholder="Total number of Projects"
                                    id="Projects"
                                    name="Projects"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="StatsUpdate-five">
                                <button className="cancel-button" onClick={handleCancel}>
                                    Cancel
                                </button>
                                <button className="update-button" onClick={handleSubmit}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="Stats-two">
                        {Array.isArray(StatsData) && StatsData.map((data, index) => {
                            return (
                                <div key={index} className="Stats-two-in">
                                    <div className="Stats-two-in-one">
                                        <p>Club ID: {data.club_id}</p>
                                    </div>
                                    <div className="Stats-two-in-two">
                                        <p>Members: {data.total_members}</p>
                                    </div>
                                    <div className="Stats-two-in-three">
                                        <p>Activities: {data.total_activities}</p>
                                    </div>
                                    <div className="Stats-two-in-four">
                                        <p>Projects: {data.total_projects}</p>
                                    </div>
                                    <button className="update-button" onClick={handleClick(data.club_id)} >
                                        Update
                                    </button>
                                </div>
                            )
                        })
                        }
                    </div>
                }
            </div>
        </div>
    </Dashboard>
  )
}

export default page
