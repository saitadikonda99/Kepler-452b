"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";

import Dashboard from '../dashboard/dashboard'

const page = () => {

    const [show, setShow] = useState(false);
    const [imageData, setImageData] = useState([]);

    const [updatedData, setUpdatedData] = useState({
        clubId: null,
        heroImg: "",
        teamImg: "",
    })

    const handleClick = (clubId) => {
        return () => {
            setShow(true);
            const data = imageData.find(data => data.club_id === clubId);

            setUpdatedData({
                clubId: clubId,
                heroImg: data.hero_img,
                teamImg: data.team_img,
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
            const response = await axios.post("/api/clubUpdate/images", updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.data.status === 200) {
                toast.success("Images updated successfully!");
                setShow(false);
            } else {
                toast.error("Failed to update images");
            }
        } catch (error) {
            toast.error("Internal server error");
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/clubUpdate/images');

                console.log(response.data)

                if (response.status === 200) {
                    setImageData(response.data);
                } else {
                    toast.error("Failed to fetch images");
                }
            } catch (error) {
                toast.error("Internal server error");
            }
        }
        fetchData();
    }, [])
    
  return (
    <Dashboard>
        <div className="ImageComponent">
            <div className="ImageComponent-in">
                { show ? 
                    <div className="Image-one">
                        <div className="Image-one-in">

                            <div className="ImageUpdate-two">
                                <p>you can update the images here</p>
                            </div>

                            <div className="ImageUpdate-two">
                                <label For="heroImg" >Hero Image</label>
                                <input
                                    type="text"
                                    value={updatedData.heroImg}
                                    placeholder="Link of the hero image"
                                    id="heroImg"
                                    name="heroImg"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="ImageUpdate-three">
                                <label For="teamImg" >Team Image</label>
                                <input
                                    type="text"
                                    value={updatedData.teamImg}
                                    placeholder="Link of the team image"
                                    id="teamImg"
                                    name="teamImg"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="ImageUpdate-four">
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
                    <div className="Image-two">
                        {Array.isArray(imageData) && imageData.map((data, index) => {
                            return (
                                <div key={index} className="Image-two-in">
                                    <img src={data.hero_img} alt="heroImg" />
                                    <img src={data.team_img} alt="teamImg" />
                                    <button onClick={handleClick(data.club_id)} >
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