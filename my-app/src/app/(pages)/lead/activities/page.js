"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";

import Dashboard from '../dashboard/dashboard'

const page = () => {

    const [show, setShow] = useState(false);
    const [ActivitiesData, setActivitiesData] = useState([]);

    const [updatedData, setUpdatedData] = useState({
        clubId: null,
        activityName: "",
        activityImage: "",
        activityDate:" ",
        activityVenue: "",
    })

    const handleClick = (id) => {
        return () => {
            setShow(true);
            const data = ActivitiesData.find(data => data.id === id);

            setUpdatedData({
                clubId: data.club_id,
                activityName: data.activity_name,
                activityImage: data.activity_image,
                activityDate: data.activity_date.split('T')[0],
                activityVenue: data.activity_venue,
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
            const response = await axios.post("/api/clubUpdate/activities", updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            console.log(response)

            if (response.status === 200) {
                toast.success("Upcoming Events activities successfully!");
                setShow(false);
            } else {
                toast.error("Failed to update Activities");
            }

            setUpdatedData({
                clubId: "",
                activityName: "",
                activityImage: "",
                activityDate: "",
                activityVenue: "",
            })

        } catch (error) {
            toast.error("Internal server error");
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/clubUpdate/activities');

                console.log(response.data)

                if (response.status === 200) {
                    setActivitiesData(response.data);
                } else {
                    toast.error("Failed to fetch Activities");
                }
            } catch (error) {
                toast.error("Internal server error");
            }
        }
        fetchData();
    }, [])
    
  return (
    <Dashboard>
        <div className="ActivitiesComponent">
            <div className="ActivitiesComponent-in">
                { show ? 
                    <div className="Activities-one">
                        <div className="Activities-one-in">

                            <div className="ActivitiesUpdate-two">
                                <p>you can update the Upcoming Activities here</p>
                            </div>

                            <div className="ActivitiesUpdate-two">
                                <label For="activityImage" >Upcoming activity Image</label>
                                <input
                                    type="text"
                                    value={updatedData.activityImage}
                                    placeholder="Link of the activity Image"
                                    id="activity Image"
                                    name="activityImage"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="ActivitiesUpdate-three">
                                <label For="activityName" >Upcoming activity Description</label>
                                <input
                                    type="text"
                                    value={updatedData.activityName}
                                    placeholder="activity Name"
                                    id="activity Name"
                                    name="activityName"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="ActivitiesUpdate-four">
                                <label For="activityDate" >Upcoming activity Date</label>
                                <input
                                    type="text"
                                    value={updatedData.activityDate}
                                    placeholder="activity Date"
                                    id="activityDate"
                                    name="activityDate"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="ActivitiesUpdate-five">
                                <label For="activityVenue" >Upcoming activity Venue</label>
                                <input
                                    type="text"
                                    value={updatedData.activityVenue}
                                    placeholder="activity venue"
                                    id="activityVenue"
                                    name="activityVenue"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="ActivitiesUpdate-six">
                                <button onClick={handleCancel}>
                                    Cancel
                                </button>
                                <button onClick={handleSubmit}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="Activities-two">
                        {Array.isArray(ActivitiesData) && ActivitiesData.map((data, index) => {
                            return (
                                <div key={index} className="Activities-two-in">
                                    
                                    <div className="Activities-two-in-img">
                                        <img src={data.activity_image} alt="heroImg" />
                                    </div>
                                    <div className="Activities-two-in-name">
                                        <p>{data.activity_name}</p>
                                    </div>
                                    <div className="Activities-two-in-date">
                                        <p>{data.activity_date.split('T')[0]}</p>
                                    </div>
                                    <div className="Activities-two-in-venue">
                                        <p>{data.activity_venue}</p>
                                    </div>
                                        
                                    <button onClick={handleClick(data.id)} >
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