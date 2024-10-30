"use client"
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-hot-toast";
import Dashboard from "../dashboard/dashboard";


const page = () => {

    const [data, setData] = useState(null);    
    const [clubId, setClubId] = useState("");


    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            setData(text);
        };
        reader.readAsText(file);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/api/clubUpdate/addActivities`, data, {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            
            console.log(response)
            if (response.status === 200) {
                toast.success("Members added successfully");
            } else {
                toast.error("Check the file data");
            }

        } catch (error) {
            toast.error("Check the file data");
        }
    }


  return (
    <Dashboard>
        <div className="addActivitiesComponent">
            <div className="addActivitiesComponent-in">

                <div className="addActivities-two">
                    <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="addActivities-three">
                    <button onClick={handleSubmit}>Submit</button>
                </div>

            </div>
        </div>
    </Dashboard>
  )
}

export default page