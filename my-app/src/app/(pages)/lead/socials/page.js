"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";

import Dashboard from '../dashboard/dashboard'
import './page.css'

const page = () => {

    const [show, setShow] = useState(false);
    const [SocialsData, setSocialsData] = useState([]);

    const [updatedData, setUpdatedData] = useState({
        clubId: null,
        socialName: null,
        socialLink: null,
    })

    const handleClick = (clubId, socialName) => {
        return () => {
            setShow(true);
            const data = SocialsData.find(data => data.social_name === socialName);

            setUpdatedData({
                clubId: clubId,
                socialName: data.social_name,
                socialLink: data.social_link,
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
            const response = await axios.post("/api/clubUpdate/socials", updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.data.status === 200) {
                toast.success("Socials updated successfully!");
                setShow(false);
            } else {
                toast.error("Failed to update Socials");
            }
        } catch (error) {
            toast.error("Internal server error");
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/clubUpdate/socials');

                console.log(response.data)

                if (response.status === 200) {
                    setSocialsData(response.data);
                } else {
                    toast.error("Failed to fetch Socials");
                }
            } catch (error) {
                toast.error("Internal server error");
            }
        }
        fetchData();
    }, [])
    
  return (
    <Dashboard>
        <div className="SocialsComponent">
            <div className="SocialsComponent-in">
                { show ? 
                    <div className="Socials-one">
                        <div className="Socials-one-in">

                            <div className="SocialsUpdate-two">
                                <p>you can update the Socials here</p>
                            </div>
                            <div className="SocialsUpdate-three">
                              <p>{updatedData.socialName}</p>
                            </div>
                            <div className="SocialsUpdate-two">
                                <label For="socialLink" >socialLink</label>
                                <input
                                    type="text"
                                    value={updatedData.socialLink}
                                    placeholder="Link to the social media"
                                    id="socialLink"
                                    name="socialLink"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="SocialsUpdate-five">
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
                    <div className="Socials-two">
                        {Array.isArray(SocialsData) && SocialsData.map((data, index) => {
                            return (
                                <div key={index} className="Socials-two-in">
                                    <div className="Socials-two-in-one">
                                        <p>Social Media Name: {data.social_name}</p>
                                    </div>
                                    <div className="Socials-two-in-two">
                                        <p>Social Media Link: {data.social_link}</p>
                                    </div>
                                    <button onClick={handleClick(data.club_id, data.social_name)} >
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