"use client"
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-hot-toast";
import Dashboard from "../dashboard/dashboard";
import './page.css'
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const page = () => {

    const [data, setData] = useState(null);    
    const [file, setFile] = useState(null);
    const [clubId, setClubId] = useState("");

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setData(text);   
      };
      reader.readAsText(file);
    };

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
            <div className="addProjects-one-one">
              <p>
              Instructions for Uploading Club Project Files{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="addProjects-one-two">
              <div className="addProjects-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                Upload a file to add a new project to the club's profile.
                </p>
              </div>
              <div className="addProjects-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                Please ensure the file is relevant and in the 
                <a href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Projects.csv?alt=media&token=ab1f8172-2e3b-41b6-981e-48029bdf92b0" download="Projects.csv"> .csv format </a> 
                before submitting.
                </p>
              </div>
            </div>
          </div>
          <div className="addProjects-two" id="final">
            <div className="addProjects-two-a" id="final-two">
              <div className={`custom-file-input ${file ? 'file-added' : ''}`}>
                <input
                  type="file"
                  id="csvFile"
                  name="csvFile"
                  accept=".csv"
                  onChange={handleFileChange}
                />
                <span>{file ? file.name : 'Drop or Add your CSV file here'}</span>
              </div>
            </div>
            <div className="addProjects-two-b" id="final-three">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default page