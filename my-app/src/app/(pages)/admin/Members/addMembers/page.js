"use client"
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-hot-toast";
import Dashboard from "../../dashboard/dashboard";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import "./page.css";
import { FileUploader } from "react-drag-drop-files";



const page = () => {

    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);
    
    const [clubData, setClubData] = useState([]);

    
    const [clubId, setClubId] = useState("");

    const fileTypes = ["CSV"];

    const handleSelectChange = (e) => {
      setClubId(e.target.value);
    }

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
            const response = await axios.post(`/api/admin/members/addMembers/${clubId}`, data, {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            
            if (response.status === 200) {
                toast.success("Members added successfully");
            } else {
                toast.error("Check the file data");
            }

        } catch (error) {
            console.log(error)
            toast.error("Check the file data");
        }
    }

    console.log(clubId)

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get("/api/admin/getClubDetails", {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });

          console.log(response)
    
          if (response.status === 200) {
            setClubData(response.data);
          } else {
            toast.error("Internal server error");
          }
        };
    
        fetchData();
      }, []);


  return (
    <Dashboard>
        <div className="addMembersComponent">
            <div className="addMembersComponent-in">
            <div className="addMembers-one">
            <div className="addMembers-one-one">
              <p>
              Instructions for Uploading Member Details{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="addMembers-one-two">
              <div className="addMembers-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                Upload a file to add new members to the club records.
                </p>
              </div>
              <div className="addMembers-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Please ensure the file is in the 
                  <a href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Activities.csv?alt=media&token=399dde4b-3835-43e1-9813-379e39e75f9c" download="Activities.csv"> .csv format</a> and relevant
                  and includes information relevant to the members you want to add.
                </p>
              </div>
            </div>
          </div>
               <div className="addMember-two" id="final">
                <div className="addMembers-two-a" id="final-one">
                    <select value={clubId} onChange={handleSelectChange}>
                        <option value="" disabled>
                        Select a club
                        </option>
                        {Array.isArray(clubData) &&
                        clubData.map((club) => (
                            club.active === 1 && (
                            <option key={club.club_id} value={club.club_id}>
                                {club.club_name}
                            </option>
                            )
                        ))}
                    </select>
                </div>

                <div className="addMembers-two-b" id="final-two">
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
                <div className="addMembers-two-c" id="final-three">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                </div>

            </div>
        </div>
    </Dashboard>
  )
}

export default page