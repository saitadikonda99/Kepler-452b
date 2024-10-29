"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import Link from 'next/link'

import Dashboard from '../dashboard/dashboard'
import "./page.css"

// import icons here
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

const page = () => {

    const [show, setShow] = useState(false);
    const [GlimpseData, setGlimpseData] = useState([]);

    const [updatedData, setUpdatedData] = useState({
        clubId: null,
        glimpseImage: "",
        glimpseDesc: "",
    })

    const handleClick = (id) => {
        return () => {
            setShow(true);
            const data = GlimpseData.find(data => data.id === id);

            setUpdatedData({
                clubId: data.club_id,
                glimpseImage: data.glimpse_image,
                glimpseDesc: data.glimpse_desc,
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
            const response = await axios.post("/api/clubUpdate/glimpse", updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.data.status === 200) {
                toast.success("Glimpses updated successfully!");
                setShow(false);
            } else {
                toast.error("Failed to update Glimpses");
            }

            setUpdatedData({
                clubId: null,
                glimpseImage: "",
                glimpseDesc: "",    
            })

        } catch (error) {
            toast.error("Internal server error");
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/clubUpdate/glimpse');

                console.log(response.data)

                if (response.status === 200) {
                    setGlimpseData(response.data);
                } else {
                    toast.error("Failed to fetch Glimpses");
                }
            } catch (error) {
                toast.error("Internal server error");
            }
        }
        fetchData();
    }, [])
    
  return (
    <Dashboard>
        <div className="GlimpseComponent">
            <div className="GlimpseComponent-in">


            <div className="Glimpse-one">
            <div className="Glimpse-one-one">
              <p>
                Instructions to update images{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="Glimpse-one-two">
              <div className="Glimpse-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display.
                </p>
              </div>

              <div className="Glimpse-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Upload and Generate Link: After resizing, download the image
                  and upload it to a storage service like
                  <Link href="http://firebase.google.com/" target="_blank">
                    {" "}
                    Firebase Storage
                  </Link>{" "}
                  or{" "}
                  <Link href="https://www.imghippo.com/" target="_blank">
                    Imghippo
                  </Link>
                </p>
              </div>
            </div>
          </div>


                { show ? 
                    <div className="Glimpse-two">
                        <div className="Glimpse-two-in">


                            <div className="GlimpseUpdate-one">
                                <label For="glimpseImage" >Glimpse Image</label>
                                <input
                                    type="text"
                                    value={updatedData.glimpseImage}
                                    placeholder="Link of the hero Glimpse"
                                    id="glimpseImage"
                                    name="glimpseImage"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="GlimpseUpdate-two">
                                <label For="glimpseDesc" >Glimpse Description</label>
                                <input
                                    type="text"
                                    value={updatedData.glimpseDesc}
                                    placeholder="Link of the team Glimpse"
                                    id="glimpseDesc"
                                    name="glimpseDesc"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="GlimpseUpdate-three">
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
                    <div className="Glimpse-three">
                        {Array.isArray(GlimpseData) && GlimpseData.map((data, index) => {
                            return (
                                <div key={index} className="Glimpse-three-in">
                                    <div className="Glimpse-three-in-img">
                                        <img src={data.glimpse_image} alt="heroImg" />
                                    </div>
                                    <div className="Glimpse-three-in-des">
                                        <p>{data.glimpse_desc}</p>
                                    </div>
                                    <div classname="Glimpse-three-in-button" id="button">
                                    <button onClick={handleClick(data.id)} >
                                        Update
                                    </button>
                                    </div>
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
