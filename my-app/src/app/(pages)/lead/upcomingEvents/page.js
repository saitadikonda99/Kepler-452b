"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";

import Dashboard from '../dashboard/dashboard'
import './page.css'

const page = () => {

    const [show, setShow] = useState(false);
    const [UpcomingEventsData, setUpcomingEventsData] = useState([]);

    const [updatedData, setUpdatedData] = useState({
        clubId: null,
        eventName: "",
        eventImage: "",
        eventDate:" ",
        eventVenue: "",
    })

    const handleClick = (id) => {
        return () => {
            setShow(true);
            const data = UpcomingEventsData.find(data => data.id === id);

            setUpdatedData({
                clubId: data.club_id,
                eventName: data.event_name,
                eventImage: data.event_image,
                eventDate: data.event_date.split('T')[0],
                eventVenue: data.event_venue,
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
            const response = await axios.post("/api/clubUpdate/upcomingEvents", updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            console.log(response)

            if (response.data.status === 200) {
                toast.success("Upcoming Events updated successfully!");
                setShow(false);
            } else {
                toast.error("Failed to update UpcomingEvents");
            }

            setUpdatedData({
                clubId: "",
                eventName: "",
                eventImage: "",
                eventDate:" ",
                eventVenue: "",
            })

        } catch (error) {
            toast.error("Internal server error");
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/clubUpdate/upcomingEvents');

                console.log(response.data)

                if (response.status === 200) {
                    setUpcomingEventsData(response.data);
                } else {
                    toast.error("Failed to fetch UpcomingEvents");
                }
            } catch (error) {
                toast.error("Internal server error");
            }
        }
        fetchData();
    }, [])
    
  return (
    <Dashboard>
        <div className="UpcomingEventsComponent">
            <div className="UpcomingEventsComponent-in">
                { show ? 
                    <div className="UpcomingEvents-one">
                        <div className="UpcomingEvents-one-in">

                            <div className="UpcomingEventsUpdate-two">
                                <p>You can update the Upcoming Events here</p>
                            </div>

                            <div className="UpcomingEventsUpdate-two">
                                <label For="eventImage" >Upcoming Event Image</label>
                                <input
                                    type="text"
                                    value={updatedData.eventImage}
                                    placeholder="Link of the UpcomingEvent Image"
                                    id="eventImage"
                                    name="eventImage"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="UpcomingEventsUpdate-three">
                                <label For="eventName" >Upcoming Event Name</label>
                                <input
                                    type="text"
                                    value={updatedData.eventName}
                                    placeholder="Event Name"
                                    id="eventName"
                                    name="eventName"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="UpcomingEventsUpdate-four">
                                <label For="eventDate" >Upcoming Event Date</label>
                                <input
                                    type="text"
                                    value={updatedData.eventDate}
                                    placeholder="Event Date"
                                    id="eventDate"
                                    name="eventDate"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="UpcomingEventsUpdate-five">
                                <label For="eventVenue" >Upcoming Event Venue</label>
                                <input
                                    type="text"
                                    value={updatedData.eventVenue}
                                    placeholder="Event venue"
                                    id="eventVenue"
                                    name="eventVenue"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="UpcomingEventsUpdate-six">
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
                    <div className="UpcomingEvents-two">
                        {Array.isArray(UpcomingEventsData) && UpcomingEventsData.map((data, index) => {
                            return (
                                <div key={index} className="UpcomingEvents-two-in">
                                    
                                    <div className="UpcomingEvents-two-in-img">
                                        <img src={data.event_image} alt="heroImg" />
                                    </div>
                                    <div className="UpcomingEvents-two-in-name">
                                        <p>{data.event_name}</p>
                                    </div>
                                    <div className="UpcomingEvents-two-in-date">
                                        <p>{data.event_date.split('T')[0]}</p>
                                    </div>
                                    <div className="UpcomingEvents-two-in-venue">
                                        <p>{data.event_venue}</p>
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
