"use client"
import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import axios from 'axios'

const Page = () => {

  const [clubData, setClubData] = useState({
    leadUsername: '',
    leadName: '',
    leadEmail: '',
    clubName: '',
    clubLogo: '',
    clubDes: ''
  });

  const handleSubmit = async () => {

    try {
      const response = await axios.post("/api/addClub", clubData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response)

      if (response.data.status === 200) {
        toast.success("Club added successful");
      }
      else {
        toast.error("Invalid details");
      }

    } catch (error) {
        console.log(error)
        toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData({
      ...clubData,
      [name]: value, 
    });
  };

  return (
    <div className="AddClubComponent">
      <div className="AddClubComponent-in">
        <input 
          type="text"
          value={clubData.clubName}
          placeholder="Name of the club"
          name='clubName'
          onChange={handleChange}
        />
        <input 
          type="text" 
          placeholder="Club logo link" 
          value={clubData.clubLogo}
          name='clubLogo'
          onChange={handleChange}
        />
        <input 
          type="text" 
          placeholder="Club description"
          name='clubDes'
          value={clubData.clubDes}
          onChange={handleChange}
        />
        <input 
          type="text" 
          placeholder="Lead username"
          name='leadUsername'
          value={clubData.leadUsername}
          onChange={handleChange}
        />
        <input 
          type="text" 
          placeholder="Lead name"
          name='leadName'
          value={clubData.leadName}
          onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder="Lead email"
          name='leadEmail'
          value={clubData.leadEmail}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Page;
