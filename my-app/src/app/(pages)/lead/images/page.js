"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";

import Dashboard from '../dashboard/dashboard'
import './page.css'

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

    console.log(imageData)


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
                                <div key={index} className="image-two-in">
                                    <div className="image-two-in-one">
                                        <h3>Instructions to update images:</h3>
                                        <p>1.)The image size should be 1024px x 1024px.<br></br> 
                                           For optimal results, you may refer to the Canva link. <br></br>
                                           2.)To get the link of the image you can firebase storage (<a href="http://firebase.google.com/">http://firebase.google.com/</a>)
                                            or else (<a href="https://www.imghippo.com/">https://www.imghippo.com/</a>) to <br></br>generate a link for an image. <br></br> 
                                            3.)Upload the link.</p>
                                    </div>
                                    <div className="image-two-in-two">
                                        <div className="image-two-in-two-img">
                                        <img src=/*{data.heroImg}*/ "https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2FIMG_6316.jpeg?alt=media&token=0d3a1156-f1e8-4c99-afa0-bdb723c41f20" alt="heroImg" />
                                        </div>
                                        <div className="image-two-in-two-img">
                                        <img src=/*{data.heroImg}*/ "https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Clubpages%2FZeroOne%2FIMG_6316.jpeg?alt=media&token=0d3a1156-f1e8-4c99-afa0-bdb723c41f20" alt="teamImg" />
                                        </div>
                                    </div>
                                    <div className="image-two-in-three">
                                    <button onClick={handleClick(data.club_id)}>
                                        Update
                                    </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    </Dashboard>
  )
}

export default page
