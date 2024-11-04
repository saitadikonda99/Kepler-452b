"use client"
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-hot-toast";
import Dashboard from "../dashboard/dashboard";
import './page.css'

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
            const response = await axios.post(`/api/clubUpdate/addProjects`, data, {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            
            console.log(response)
            if (response.status === 200) {
                toast.success("Projects added successfully");
            } else {
                toast.error("Check the file data");
            }

        } catch (error) {
            toast.error(error.message);
        }
    }


  return (
    <Dashboard>
        <div className="addProjectsComponent">
            <div className="addProjectsComponent-in">
                <div className="addProjects-one"> 
                   <h3>Add a new project</h3>
                </div>
                <div className="addProjects-two">
                <div className="addProjects-two-a" id="input">
                    <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="addProjects-two-b">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                </div>

            </div>
        </div>
    </Dashboard>
  )
}

export default page