"use client"
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-hot-toast";
import Dashboard from "../../dashboard/dashboard";


const page = () => {

    const [data, setData] = useState(null);
    
    const [clubData, setClubData] = useState([]);

    
    const [clubId, setClubId] = useState("");

    const handleSelectChange = (e) => {
      setClubId(e.target.value);
    }

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
            const response = await axios.post(`/api/admin/members/addMembers/${clubId}`, data, {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            
            if (response.status === 200) {
                toast.success("Members added successfully");
            } else {
                toast.error("Internal server error");
            }

        } catch (error) {
            toast.error("Internal server error");
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

                <div className="addMembers-two">
                    <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="addMembers-three">
                    <button onClick={handleSubmit}>Submit</button>
                </div>

            </div>
        </div>
    </Dashboard>
  )
}

export default page